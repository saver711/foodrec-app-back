"use strict";

/**
 * meal service
 */

const { createCoreService } = require("@strapi/strapi").factories;
const entity = "api::meal.meal";
module.exports = createCoreService(entity, {
  async toggleLikeMeal(mealId, userId, query) {
    const theMealToLike = await strapi.entityService.findOne(entity, mealId, {
      populate: ["likedBy"],
    });

    const usersLikedThisMeal = theMealToLike.likedBy.map((user) => user.id);

    const isTheSameUserTryingToLikeAgain = usersLikedThisMeal.some(
      (likedUserId) => likedUserId === userId
    );

    const finalUsersToBeSetAsLikes = isTheSameUserTryingToLikeAgain
      ? usersLikedThisMeal.filter((likedUserId) => likedUserId !== userId)
      : [...usersLikedThisMeal, userId];

    const meal = await strapi.entityService.update(entity, mealId, {
      data: {
        likedBy: finalUsersToBeSetAsLikes,
      },
      ...query,
    });
    return meal;
  },

  async sortByRecommendationsCount(comingQuery) {
    const newQueryObj = this.getFetchParams(comingQuery);
    const allMeals = await strapi.entityService.findMany(entity, newQueryObj);
    const sortByRecommendationsCount = newQueryObj.sortByRecommendationsCount;
    if (!sortByRecommendationsCount) return allMeals;
    const sortedMeals = allMeals.sort((a, b) => {
      if (sortByRecommendationsCount === "desc") {
        return b.recommendations.length - a.recommendations.length;
      } else {
        return a.recommendations.length - b.recommendations.length;
      }
    });
    return sortedMeals;
  },
});

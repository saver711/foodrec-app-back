"use strict";

/**
 * meal controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const entity = "api::meal.meal"
module.exports = createCoreController(entity, ({ strapi }) => ({
  async toggleLikeMeal(ctx) {
    // if (!ctx.state.user) throw new UnauthorizedError("You need to login first"); // i don't really need to do this because it is a handler for new custom route which is not reachable for public users -or auth users actually- by default
    const mealId = ctx.params.id;
    const { query } = ctx.request;
    const userId = ctx.state.user.id;
    const likedMeal = await strapi
      .service(entity)
      .toggleLikeMeal(mealId, userId, query);

    const sanitizedLikedMeal = await this.sanitizeOutput(likedMeal, ctx);
    return this.transformResponse(sanitizedLikedMeal);
  },
  async find(ctx) {
    const { query } = ctx;
    const sortedMeals = await strapi.service(entity).sortByRecommendationsCount(query);

    const sanitizedSortedMeals = await this.sanitizeOutput(
      sortedMeals,
      ctx
    );
    const finalDataToReturn = this.transformResponse(sanitizedSortedMeals);
    return finalDataToReturn;
  },
}));

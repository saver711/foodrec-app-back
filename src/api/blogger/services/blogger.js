"use strict";

/**
 * blogger service
 */

const { createCoreService } = require("@strapi/strapi").factories;
const entity = "api::blogger.blogger";
module.exports = createCoreService(entity, {
  async sortByRecommendationsCount(comingQuery) {
    const newQueryObj = this.getFetchParams(comingQuery);
    const allBloggers = await strapi.entityService.findMany(entity, newQueryObj);
    const sortByRecommendationsCount = newQueryObj.sortByRecommendationsCount;
    if (!sortByRecommendationsCount) return allBloggers;
    const sortedBloggers = allBloggers.sort((a, b) => {
      if (sortByRecommendationsCount === "desc") {
        return b.recommendations.length - a.recommendations.length;
      } else {
        return a.recommendations.length - b.recommendations.length;
      }
    });
    return sortedBloggers;
  },
});

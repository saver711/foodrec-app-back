"use strict";

/**
 * blogger controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const entity = "api::blogger.blogger";
module.exports = createCoreController(entity, ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    const sortedBloggers = await strapi
      .service(entity)
      .sortByRecommendationsCount(query);

    const sanitizedSortedBloggers = await this.sanitizeOutput(sortedBloggers, ctx);
    const finalDataToReturn = this.transformResponse(sanitizedSortedBloggers);
    return finalDataToReturn;
  },
}));

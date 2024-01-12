'use strict';
/**
 * location controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const entity = "api::location.location"
module.exports = createCoreController(entity,
({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;    
    const sortedLocations = await strapi
      .service(entity)
      .sortByNearby(query);

    const sanitizedSortedLocations = await this.sanitizeOutput(
      sortedLocations,
      ctx
    );
    const finalDataToReturn = this.transformResponse(sanitizedSortedLocations);
    return finalDataToReturn
  },
}));
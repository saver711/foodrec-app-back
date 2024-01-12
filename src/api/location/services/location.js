"use strict";
const nearbySort = require("nearby-sort");

/**
 * location service
 */

const { createCoreService } = require("@strapi/strapi").factories;
const entity = "api::location.location"
module.exports = createCoreService(entity, {
  async sortByNearby(comingQuery) {
    const newQueryObj = this.getFetchParams(comingQuery);
    const allLocations = await strapi.entityService.findMany(
      entity,
      newQueryObj
    );
    const userLocation = newQueryObj.userLocation
    if(!userLocation) return allLocations
    const parsedUserLocation = JSON.parse(userLocation)
    const sortedLocations = await nearbySort(parsedUserLocation, allLocations);
    return sortedLocations;
  },
});

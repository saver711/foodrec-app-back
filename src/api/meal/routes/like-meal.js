module.exports = {
    routes: [
      {
        method: "PUT",
        path: "/meals/:id/toggleLike",
        handler: "api::meal.meal.toggleLikeMeal",
      //   config: {},
      },
    ],
  };
  
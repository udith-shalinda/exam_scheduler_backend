import { handlerPath } from "src/shared/handlerResolver";

export default {
  createHall: {
    handler: `${handlerPath(__dirname)}/index.createHall`,
    events: [
      {
        http: {
          method: "post",
          path: "createHall",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  updateHall: {
    handler: `${handlerPath(__dirname)}/index.updateHall`,
    events: [
      {
        http: {
          method: "put",
          path: "updateHall",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  deleteHall: {
    handler: `${handlerPath(__dirname)}/index.deleteHall`,
    events: [
      {
        http: {
          method: "delete",
          path: "deleteHall/{id}",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  getAllHallsByExam: {
    handler: `${handlerPath(__dirname)}/index.getAllHallsByExam`,
    events: [
      {
        http: {
          method: "get",
          path: "getAllHallsByExam/{id}",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  getOneHallById: {
    handler: `${handlerPath(__dirname)}/index.getOneHallById`,
    events: [
      {
        http: {
          method: "get",
          path: "getOneHallById/{id}",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
};

import { handlerPath } from "src/shared/handlerResolver";

export default {
  createTimeTable: {
    handler: `${handlerPath(__dirname)}/index.createTimeTable`,
    events: [
      {
        http: {
          method: "post",
          path: "createTimeTable",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  updateTimeTable: {
    handler: `${handlerPath(__dirname)}/index.updateTimeTable`,
    events: [
      {
        http: {
          method: "put",
          path: "updateTimeTable",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  deleteTimeTable: {
    handler: `${handlerPath(__dirname)}/index.deleteTimeTable`,
    events: [
      {
        http: {
          method: "delete",
          path: "deleteTimeTable/{id}",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  getAllTimeTablesByExam: {
    handler: `${handlerPath(__dirname)}/index.getAllTimeTablesByExam`,
    events: [
      {
        http: {
          method: "get",
          path: "getAllTimeTablesByExam/{id}",
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

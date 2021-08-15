import { handlerPath } from "src/shared/handlerResolver";

export default {
  createExam: {
    handler: `${handlerPath(__dirname)}/index.createExam`,
    events: [
      {
        http: {
          method: "post",
          path: "createExam",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  updateExam: {
    handler: `${handlerPath(__dirname)}/index.updateExam`,
    events: [
      {
        http: {
          method: "put",
          path: "updateExam",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  deleteExam: {
    handler: `${handlerPath(__dirname)}/index.deleteExam`,
    events: [
      {
        http: {
          method: "delete",
          path: "deleteExam/{id}",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  getAllExams: {
    handler: `${handlerPath(__dirname)}/index.getAllExams`,
    events: [
      {
        http: {
          method: "get",
          path: "getAllExams",
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

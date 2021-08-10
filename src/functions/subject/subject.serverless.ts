import { handlerPath } from "src/shared/handlerResolver";

export default {
  createSubject: {
    handler: `${handlerPath(__dirname)}/index.createSubject`,
    events: [
      {
        http: {
          method: "post",
          path: "createSubject",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  updateSubject: {
    handler: `${handlerPath(__dirname)}/index.updateSubject`,
    events: [
      {
        http: {
          method: "put",
          path: "updateSubject",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  deleteSubject: {
    handler: `${handlerPath(__dirname)}/index.deleteSubject`,
    events: [
      {
        http: {
          method: "delete",
          path: "deleteSubject/{id}",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  getAllSubjectsByExam: {
    handler: `${handlerPath(__dirname)}/index.getAllSubjectsByExam`,
    events: [
      {
        http: {
          method: "get",
          path: "getAllSubjectsByExam/{id}",
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

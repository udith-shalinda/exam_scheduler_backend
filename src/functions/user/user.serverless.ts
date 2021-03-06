import { handlerPath } from "src/shared/handlerResolver";

export default {
  login: {
    handler: `${handlerPath(__dirname)}/index.login`,
    events: [
      {
        http: {
          method: "post",
          path: "login",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  register: {
    handler: `${handlerPath(__dirname)}/index.register`,
    events: [
      {
        http: {
          method: "post",
          path: "register",
        //   request: {
        //     schema: {
        //       "application/json": schema,
        //     },
        //   },
        },
      },
    ],
  },
  whoAmI: {
    handler: `${handlerPath(__dirname)}/index.whoAmI`,
    events: [
      {
        http: {
          method: "get",
          path: "whoAmI",
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

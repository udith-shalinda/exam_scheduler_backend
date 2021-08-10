import schema from "./schema";
import { handlerPath } from "src/shared/handlerResolver";

export default {
  hello: {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
      {
        http: {
          method: "post",
          path: "hello",
          request: {
            schema: {
              "application/json": schema,
            },
          },
        },
      },
    ],
  },
};

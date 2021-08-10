import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from 'src/shared/apiGateway';
import { formatJSONResponse } from 'src/shared/apiGateway';
import { middyfy } from 'src/shared/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
}

export const main = middyfy(hello);

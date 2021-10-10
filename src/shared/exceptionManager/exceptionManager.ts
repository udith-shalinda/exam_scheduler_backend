import { formatJSONResponse } from 'src/shared/apiGateway';
import {
  BadRequestException,
  ConfigurationException,
  ConflictException,
  Exception,
  ForbiddenException,
  NotFoundException,
  UnAuthorizedException,
} from './exceptions';

/**
 * Handles the exception given an exception object and
 * Based on the exception type returns the relevant HTTP response
 * @param exception exception object
 */
function _handlerException(exception: Exception): any {
  if (exception instanceof NotFoundException) {
    return formatJSONResponse(
      {message: exception.message},
      404,
    );
  }
  if (exception instanceof ForbiddenException) {
    return formatJSONResponse(
      {message: exception.message},
      403,
    );
  }
  if (exception instanceof ConfigurationException) {
    return formatJSONResponse(
      {message: exception.message},
      403,
    );
  }
  if (exception instanceof BadRequestException) {
    return formatJSONResponse(
      {message: exception.message},
      403,
    );
  }
  if (exception instanceof ConflictException) {
    return formatJSONResponse(
      {message: exception.message},
      409,
    );
  }
  if (exception instanceof UnAuthorizedException) {
    return formatJSONResponse(
      {message: exception.message},
      401,
    );
  }
  return formatJSONResponse(
    {message: exception},
    500,
  );
}

// tslint:disable
function exceptionHandler(): (
  target: object,
  functionName: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor {
  return function (
    _target: object,
    // @ts-ignore
    functionName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod: any = descriptor.value;

    descriptor.value = async function (...args: any) {
      try {
        // Execute the actual method wrapped in the audit decorator and get the output
        const output: object = await originalMethod.apply(this, args);
        return output;
      } catch (error) {
        // new Logger({
        //   tags: [exceptionHandler.name, functionName],
        // }).error('An Exception was caught', {
        //   message: error.message,
        //   stack: error.stack,
        // });
        console.log('error', error);
        return _handlerException(error);
      }
    };

    return descriptor;
  };
}

export { exceptionHandler as HandleException };

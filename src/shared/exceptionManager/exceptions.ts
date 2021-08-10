abstract class Exception extends Error {
  public constructor(public description?: string) {
    super(description);
  }
}

class BadRequestException extends Exception {}
class UnAuthorizedException extends Exception {}

class ConfigurationException extends Exception {}

class ForbiddenException extends Exception {}

class InternalServerException extends Exception {}

class NotFoundException extends Exception {}

class ConflictException extends Exception {}

export {
  BadRequestException,
  ConfigurationException,
  ConflictException,
  ForbiddenException,
  InternalServerException,
  NotFoundException,
  Exception,
  UnAuthorizedException,
};

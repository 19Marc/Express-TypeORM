import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import{ RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

function DtoValidationMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.keys(error.constraints).map(key => error.constraints[key])).join(', ');
          // Object.values(error.constraints)
          next(new HttpException(400, message));
        } else {
          next();
        }
      });
  };
}

export default DtoValidationMiddleware;

import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

// class Validator {
export const userValidator = async () => {
  return [
    body('userName').isAlphanumeric('en-IN', { ignore: '.' }),
    body('avatar').isString(),
    body('email').isEmail(),
    body('firstName').isAlpha(),
    body('lastName').isAfter(),
    body('password').isStrongPassword(),
    (req: Request, res: Response, next: NextFunction) => {
      const result = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }
      res.status(422).json({ errors: result.array() });
    }
  ];
};
// export default Validator;

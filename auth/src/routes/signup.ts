import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    validateRequest,
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    // Hash password here
    const hashedPassword = password;

    const user = User.build({ email, password: hashedPassword });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      `${process.env.JWt_KEY!}`
    );

    // Store it on session object
    req.session = { jwt: userJwt };

    res.status(200).send(user);
  }
);

export { router as signupRouter };

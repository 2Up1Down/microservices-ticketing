import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@wsticketing/common";

import { User } from "../models/user";
import { Jwt } from "../services/jwt";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    validateRequest,
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    // Hash password here
    const hashedPassword = password;

    const user = User.build({ email, password: hashedPassword });
    await user.save();

    // Generate JWT
    const userJwt = Jwt.sign({
      id: user.id,
      email: user.email,
    });

    // Store it on session object
    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };

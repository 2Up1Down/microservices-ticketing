import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@wsticketing/common";
import { body } from "express-validator";
import mongoose from "mongoose";

import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [
    body("token").not().isEmpty().withMessage("Invalid token"),
    body("orderId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Invalid orderId"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { currentUser } = req;
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for a cancelled order");
    }

    res.send({ success: true });
  }
);

export { router as createChargeRouter };

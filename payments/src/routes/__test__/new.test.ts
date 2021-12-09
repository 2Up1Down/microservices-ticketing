import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { getAuthCookie } from "../../test/setup";
import mongoose from "mongoose";
import { OrderStatus } from "@wsticketing/common";

import { stripe } from "../../stripe";

// jest.mock("../../stripe");

// interface BuildOrderOptions {
//   orderId?: string | undefined;
//   userId?: string | undefined;
//   price?: number | undefined;
// }
//
// const buildOrder = async (options?: BuildOrderOptions) => {
//   const order = Order.build({
//     id: options?.orderId || new mongoose.Types.ObjectId().toHexString(),
//     price: options?.price || 666,
//     status: OrderStatus.Created,
//     userId: options?.userId || new mongoose.Types.ObjectId().toHexString(),
//     version: 0,
//   });
//   await order.save();
//   return order;
// };

// it("returns a 404 when purchasing an order that does not exist", async () => {
//   await request(app)
//     .post("/api/payments")
//     .set("Cookie", getAuthCookie())
//     .send({
//       token: "non-important-token-id",
//       orderId: new mongoose.Types.ObjectId().toHexString(),
//     })
//     .expect(404);
// });
//
// it("returns a 401 when purchasing an order that does not belong to the user", async () => {
//   const order = await buildOrder();
//
//   await request(app)
//     .post("/api/payments")
//     .set("Cookie", getAuthCookie())
//     .send({
//       token: "non-important-token-id",
//       orderId: order.id,
//     })
//     .expect(401);
// });
//
// it("returns a 400 when purchasing a cancelled order", async () => {
//   const userId = new mongoose.Types.ObjectId().toHexString();
//
//   const order = await buildOrder({ userId });
//   order.set({ status: OrderStatus.Cancelled });
//   await order.save();
//
//   await request(app)
//     .post("/api/payments")
//     .set("Cookie", getAuthCookie(userId))
//     .send({
//       orderId: order.id,
//       token: "non-important-token-id",
//     })
//     .expect(400);
// });

// it("returns a 204 with valid inputs and mock stripe API", async () => {
//   const userId = new mongoose.Types.ObjectId().toHexString();
//   const order = await buildOrder({ userId });
//
//   await request(app)
//     .post("/api/payments")
//     .set("Cookie", getAuthCookie(userId))
//     .send({
//       token: "tok_visa",
//       orderId: order.id,
//     })
//     .expect(201);
//
//   const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
//   expect(chargeOptions.source).toEqual("tok_visa");
//   expect(chargeOptions.amount).toEqual(order.price * 100);
//   expect(chargeOptions.currency).toEqual("chf");
// });

// it("returns a 204 with valid inputs and mock stripe API", async () => {
//   const userId = new mongoose.Types.ObjectId().toHexString();
//   const price = Math.floor(Math.random() * 1000);
//   const order = await buildOrder({ userId, price });
//
//   await request(app)
//     .post("/api/payments")
//     .set("Cookie", getAuthCookie(userId))
//     .send({
//       token: "tok_visa",
//       orderId: order.id,
//     })
//     .expect(201);
//
//   const stripeCharges = await stripe.charges.list({ limit: 50 });
//   const stripeCharge = stripeCharges.data.find((charge) => {
//     return charge.amount === price * 100;
//   });
//
//   expect(stripeCharge).toBeDefined();
// });

it("creates a stripe charge", async () => {
  console.log(process.env.STRIPE_KEY);
  await stripe.charges.create({
    currency: "chf",
    amount: 123456,
    source: "tok_visa",
  });
  //
  // console.log("Example Stripe charge created");
  //
  // const userId = new mongoose.Types.ObjectId().toHexString();
  // const order = await buildOrder({ userId });
  // await request(app)
  //   .post("/api/payments")
  //   .set("Cookie", getAuthCookie(userId))
  //   .send({
  //     token: "tok_visa",
  //     orderId: order.id,
  //   })
  //   .expect(201);
  //
  // console.log("Supertest charge created");
});

import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { getAuthCookie } from "../../test/setup";
import mongoose from "mongoose";
import { OrderStatus } from "@wsticketing/common";

interface BuildOrderOptions {
  orderId?: string | undefined;
  userId?: string | undefined;
}

const buildOrder = async (options?: BuildOrderOptions) => {
  const order = Order.build({
    id: options?.orderId || new mongoose.Types.ObjectId().toHexString(),
    price: 999,
    status: OrderStatus.Created,
    userId: options?.userId || new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  });
  await order.save();
  return order;
};

it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", getAuthCookie())
    .send({
      token: "non-important-token-id",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns a 401 when purchasing an order that does not belong to the user", async () => {
  const order = await buildOrder();

  await request(app)
    .post("/api/payments")
    .set("Cookie", getAuthCookie())
    .send({
      token: "non-important-token-id",
      orderId: order.id,
    })
    .expect(401);
});

it("returns a 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = await buildOrder({ userId });
  order.set({ status: OrderStatus.Cancelled });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", getAuthCookie(userId))
    .send({
      orderId: order.id,
      token: "non-important-token-id",
    })
    .expect(400);
});

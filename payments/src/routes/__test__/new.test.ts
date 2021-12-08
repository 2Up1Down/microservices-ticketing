import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { getAuthCookie } from "../../test/setup";
import mongoose from "mongoose";
import { OrderStatus } from "@wsticketing/common";

const buildOrder = async (orderId?: string, userId?: string) => {
  const order = Order.build({
    id: orderId || new mongoose.Types.ObjectId().toHexString(),
    price: 999,
    status: OrderStatus.Created,
    userId: userId || new mongoose.Types.ObjectId().toHexString(),
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

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 999,
    status: OrderStatus.Cancelled,
    userId,
    version: 0,
  });
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

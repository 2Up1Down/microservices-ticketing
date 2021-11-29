import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { buildOrder, buildTicket, getAuthCookie } from "../../test/setup";
import { OrderStatus } from "../../models/order";

it("returns an error if the order is not found", async () => {
  const user = getAuthCookie();
  const orderId = new mongoose.Types.ObjectId();

  await request(app)
    .delete(`/api/orders/${orderId}`)
    .set("Cookie", user)
    .send({})
    .expect(404);
});

it("returns an error if the order does not belong to the current user", async () => {
  const ticket = await buildTicket();

  const userOne = getAuthCookie();
  const { body: order } = await buildOrder(userOne, ticket);

  const userTwo = getAuthCookie();
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", userTwo)
    .send({})
    .expect(401);
});

it("marks an order as cancelled", async () => {
  const ticket = await buildTicket();

  const user = getAuthCookie();
  const { body: order } = await buildOrder(user, ticket);

  const { body: updatedOrder } = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send({})
    .expect(200);

  expect(updatedOrder.id).toEqual(order.id);
  expect(updatedOrder.status).toEqual(OrderStatus.Cancelled);
});

it.todo("emits an order cancelled event");

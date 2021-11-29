import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { buildTicket, buildOrder, getAuthCookie } from "../../test/setup";

it("returns an not found error if the order does not exist", async () => {
  const user = getAuthCookie();
  const orderId = new mongoose.Types.ObjectId();

  await request(app)
    .get(`/api/orders/${orderId}`)
    .set("Cookie", user)
    .send({})
    .expect(404);
});

it("fetches an error if one user tries to fetch another users order", async () => {
  const ticket = await buildTicket();

  const userOne = getAuthCookie();
  const { body: order } = await buildOrder(userOne, ticket);

  const userTwo = getAuthCookie();
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", userTwo)
    .send({})
    .expect(401);
});

it("fetches the order", async () => {
  const ticket = await buildTicket();

  const user = getAuthCookie();
  const { body: order } = await buildOrder(user, ticket);

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send({})
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

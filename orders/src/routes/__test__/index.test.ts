import request from "supertest";
import { app } from "../../app";
import { buildTicket, buildOrder, getAuthCookie } from "../../test/setup";

it("fetches orders for a particular user", async () => {
  // create three tickets
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  // Create one order as User #1
  const userOne = getAuthCookie();
  await buildOrder(userOne, ticketOne);

  // Create two orders as User #2
  const userTwo = getAuthCookie();
  const { body: orderOne } = await buildOrder(userTwo, ticketTwo);
  const { body: orderTwo } = await buildOrder(userTwo, ticketThree);

  // Make request to get orders for User #2
  const { body: orders } = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .send({})
    .expect(200);

  // Make sure we only got the orders for User #2
  expect(orders.length).toEqual(2);
  expect(orders[0].id).toEqual(orderOne.id);
  expect(orders[1].id).toEqual(orderTwo.id);
});

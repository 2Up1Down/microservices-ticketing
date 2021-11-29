import request from "supertest";
import { app } from "../../app";
import { Ticket, TicketDoc } from "../../models/ticket";
import { getAuthCookie } from "../../test/setup";

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "abcdefg",
    price: 123,
  });
  await ticket.save();

  return ticket;
};

const buildOrder = async (userCookie: string[], ticket: TicketDoc) => {
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", userCookie)
    .send({
      ticketId: ticket.id,
    });

  return response;
};

it("returns an not found error if the order does not exist", async () => {
  const user = getAuthCookie();
  const orderId = "some-order-id-tha-does-not-exist";

  await request(app)
    .get(`/api/orders/${orderId}`)
    .set("Cookie", user)
    .send({})
    .expect(400);
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

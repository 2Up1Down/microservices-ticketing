import request from "supertest";
import { app } from "../../app";
import { getAuthCookie } from "../../test/setup";

const createTicket = () => {
  const data = {
    title: "ticket title",
    price: 20,
  };

  return request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send(data);
};

it("can fetch a list of tickets", async () => {
  // Create 3 tickets
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app)
    .get("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({});

  const tickets = response.body;

  expect(tickets.length).toEqual(3);
});

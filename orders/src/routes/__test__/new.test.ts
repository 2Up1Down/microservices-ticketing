import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { getAuthCookie } from "../../test/setup";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

it("has a route handler listening to /api/orders for post requests", async () => {
  const response = await request(app).post("/api/orders").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/orders").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if the ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({
      ticketId,
    })
    .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    title: "valid title",
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    ticket,
    status: OrderStatus.Created,
    userId: "abc",
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({
      ticketId: ticket.id,
    })
    .expect(400);
});

it("Reserves a ticket", async () => {
  const ticket = Ticket.build({
    title: "valid title",
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({
      ticketId: ticket.id,
    })
    .expect(201);
});

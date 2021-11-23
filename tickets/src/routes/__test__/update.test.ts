import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { getAuthCookie } from "../../test/setup";
import { natsWrapper } from "../../nats-wrapper";
import { Subjects } from "@wsticketing/common";

const validData = {
  title: "this is a valid title",
  price: 20,
};

const differentValidData = {
  title: "this is a different valid title",
  price: 30,
};

const invalidTitle = {
  title: "",
  price: 20,
};

const invalidPrice = {
  title: "this is a valid title",
  price: {},
};

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", getAuthCookie())
    .send(validData)
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).put(`/api/tickets/${id}`).send(validData).expect(401);
});

it("returns a 401 if the user does not own a ticket", async () => {
  const userCookie = getAuthCookie();
  const createdTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", userCookie)
    .send(validData);

  // pretend to be another user
  await request(app)
    .put(`/api/tickets/${createdTicket.body.id}`)
    .set("Cookie", getAuthCookie())
    .send(differentValidData)
    .expect(401);

  // another request from initial user
  const ticket = await request(app)
    .get(`/api/tickets/${createdTicket.body.id}`)
    .send();

  expect(ticket.body).toEqual(createdTicket.body);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const userCookie = getAuthCookie();
  const createdTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", userCookie)
    .send(validData);

  await request(app)
    .put(`/api/tickets/${createdTicket.body.id}`)
    .set("Cookie", userCookie)
    .send(invalidTitle)
    .expect(400);

  await request(app)
    .put(`/api/tickets/${createdTicket.body.id}`)
    .set("Cookie", userCookie)
    .send(invalidPrice)
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const userCookie = getAuthCookie();
  const createdTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", userCookie)
    .send(validData);

  await request(app)
    .put(`/api/tickets/${createdTicket.body.id}`)
    .set("Cookie", userCookie)
    .send(differentValidData)
    .expect(200);

  const updatedTicket = await request(app)
    .get(`/api/tickets/${createdTicket.body.id}`)
    .send();

  expect(updatedTicket.body.title).toEqual(differentValidData.title);
  expect(updatedTicket.body.price).toEqual(differentValidData.price);
});

it("publishes an event", async () => {
  const userCookie = getAuthCookie();
  const createdTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", userCookie)
    .send(validData);

  await request(app)
    .put(`/api/tickets/${createdTicket.body.id}`)
    .set("Cookie", userCookie)
    .send(differentValidData)
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenLastCalledWith(
    Subjects.TicketUpdated,
    expect.anything(),
    expect.anything()
  );
});

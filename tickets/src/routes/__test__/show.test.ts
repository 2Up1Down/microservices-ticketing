import request from "supertest";

import { app } from "../../app";
import { getAuthCookie } from "../../test/setup";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const data = {
    title: "concert",
    price: 20,
  };

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send(data)
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(data.title);
  expect(ticketResponse.body.price).toEqual(data.price);
});

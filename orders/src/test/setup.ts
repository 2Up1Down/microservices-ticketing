import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import request from "supertest";

import { Ticket, TicketDoc } from "../models/ticket";
import { app } from "../app";

let mongo: any;

jest.mock("../nats-wrapper");

beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

const getAuthCookie = (
  id = new mongoose.Types.ObjectId().toHexString()
): string[] => {
  // Build a JWT payload. { id, email }
  const payload = {
    id,
    email: "test@test.com",
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string that's the cookie with the encoded data
  return [`express:sess=${base64}`];
};

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

export { getAuthCookie, buildTicket, buildOrder };

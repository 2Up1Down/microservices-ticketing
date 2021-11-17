import request from "supertest";
import { app } from "../../app";
import { getAuthCookie } from "../../test/setup";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({
      title: "",
      price: 1,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({
      price: 2,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({
      title: "this is valid title",
      price: -3,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({
      title: "this is valid title",
      price: "abc",
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({
      title: "this is valid title",
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({
      title: "this is valid title",
      price: {},
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({
      title: "this is valid title",
      price: 20,
    })
    .expect(201);
});

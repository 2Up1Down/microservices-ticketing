import { Ticket } from "../ticket";
import { buildTicket } from "../../test/setup";

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "Lord of the rings",
    price: 1,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});

it("increments the version number on updated ticket data", async () => {
  const ticket = Ticket.build({
    title: "Lord of the rings 1",
    price: 1,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  ticket.title = "Lord of the rings 2";
  ticket.price = 2;
  await ticket.save();
  expect(ticket.version).toEqual(1);
});

it("implements optimistic concurrency control", async () => {
  // Create an instance of a ticket
  const ticket = await buildTicket();

  // Save the ticket to the database
  await ticket.save();

  // Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 20 });

  // Save the first fetched ticket
  await firstInstance!.save();

  // Save the second fetched ticket and expect an error
  await expect(secondInstance!.save()).rejects.toThrow();
});

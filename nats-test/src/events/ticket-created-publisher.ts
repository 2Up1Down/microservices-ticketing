import { Publisher } from "./base-publisher";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";
import { Stan } from "node-nats-streaming";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

import { Publisher, TicketCreatedEvent, Subjects } from "@wsticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

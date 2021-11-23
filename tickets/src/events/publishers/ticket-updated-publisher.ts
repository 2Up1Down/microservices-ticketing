import { Publisher, Subjects, TicketUpdatedEvent } from "@wsticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

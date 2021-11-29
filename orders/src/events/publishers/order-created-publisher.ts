import { Publisher, OrderCreatedEvent, Subjects } from "@wsticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}

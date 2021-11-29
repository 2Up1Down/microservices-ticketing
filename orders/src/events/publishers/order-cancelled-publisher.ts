import { Subjects, Publisher, OrderCancelledEvent } from "@wsticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}

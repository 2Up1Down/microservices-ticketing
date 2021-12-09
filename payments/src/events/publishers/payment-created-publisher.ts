import { PaymentCreatedEvent, Publisher, Subjects } from "@wsticketing/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}

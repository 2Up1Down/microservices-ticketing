import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@wsticketing/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}

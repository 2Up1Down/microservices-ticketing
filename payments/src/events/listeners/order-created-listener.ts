import { Listener, OrderCreatedEvent, Subjects } from "@wsticketing/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { id, userId, status, ticket, version } = data;

    const order = Order.build({
      id,
      status,
      version,
      userId,
      price: ticket.price,
    });
    await order.save();

    msg.ack();
  }
}

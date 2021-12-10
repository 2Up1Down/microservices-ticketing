import React from "react";
import getCurrentUser from "../../lib/auth";
import BaseLayout from "../../components/common/base-layout";
import { getAllOrders } from "../../lib/orders";

const OrderDetailPage = ({ currentUser, orders }) => {
  return (
    <BaseLayout user={currentUser}>
      <h1>My Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        ))}
      </ul>
    </BaseLayout>
  );
};

export async function getServerSideProps({ req }) {
  const currentUser = await getCurrentUser(req.headers);
  const orders = await getAllOrders(req.headers);

  return {
    props: { currentUser, orders },
  };
}

export default OrderDetailPage;

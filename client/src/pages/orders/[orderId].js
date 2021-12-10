import React, { useEffect, useState } from "react";
import getCurrentUser from "../../lib/auth";
import BaseLayout from "../../components/common/base-layout";
import { getOrderById } from "../../lib/orders";

const OrderDetailPage = ({ currentUser, order }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  return (
    <BaseLayout user={currentUser}>
      <h1>Order Detail Page</h1>
      {timeLeft > 0 ? (
        <div>Time left to pay: {timeLeft} seconds</div>
      ) : (
        <div>Order expired</div>
      )}
    </BaseLayout>
  );
};

export async function getServerSideProps({ query, req }) {
  const { orderId } = query;

  const currentUser = await getCurrentUser(req.headers);
  const order = await getOrderById(req.headers, orderId);

  return {
    props: { currentUser, order },
  };
}

export default OrderDetailPage;

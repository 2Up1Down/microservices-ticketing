import React, { useEffect, useState } from "react";
import getCurrentUser from "../../lib/auth";
import BaseLayout from "../../components/common/base-layout";
import { getOrderById } from "../../lib/orders";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Error from "../../components/common/error";

const OrderDetailPage = ({ currentUser, order }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/payments/",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => console.log(payment),
  });

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

  const onToken = ({ id }) => {
    doRequest({ token: id });
  };

  return (
    <BaseLayout user={currentUser}>
      <h1>Order Detail Page</h1>
      {timeLeft > 0 ? (
        <div>Time left to pay: {timeLeft} seconds</div>
      ) : (
        <div>Order expired</div>
      )}
      <StripeCheckout
        token={(token) => onToken(token)}
        stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      <Error errors={errors} />
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

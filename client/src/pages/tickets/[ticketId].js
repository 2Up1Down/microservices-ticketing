import React from "react";
import getCurrentUser from "../../lib/auth";
import BaseLayout from "../../components/common/base-layout";
import { getTicketById } from "../../lib/tickets";
import useRequest from "../../hooks/use-request";
import Error from "../../components/common/error";
import { useRouter } from "next/router";

const TicketDetailPage = ({ currentUser, ticket }) => {
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/orders/",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => router.push(`/orders/${order.id}`),
  });

  return (
    <BaseLayout user={currentUser}>
      <h1>{ticket.title}</h1>
      <h4>{ticket.price}</h4>
      <Error errors={errors} />
      <button className="btn btn-primary" onClick={doRequest}>
        Purchase
      </button>
    </BaseLayout>
  );
};

export async function getServerSideProps({ query, req }) {
  const { ticketId } = query;
  const currentUser = await getCurrentUser(req.headers);

  const ticket = await getTicketById(req.headers, ticketId);

  return {
    props: { currentUser, ticket },
  };
}

export default TicketDetailPage;

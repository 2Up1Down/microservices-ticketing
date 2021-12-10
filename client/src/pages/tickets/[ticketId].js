import React from "react";
import getCurrentUser from "../../lib/auth";
import BaseLayout from "../../components/common/base-layout";
import { getTicketById } from "../../lib/tickets";
import useRequest from "../../hooks/use-request";
import Error from "../../components/common/error";

const TicketDetailPage = ({ currentUser, ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders/",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => console.log(order),
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
  const currentUser = await getCurrentUser(req.headers);
  const { ticketId } = query;

  const ticket = await getTicketById(req.headers, ticketId);

  return {
    props: { currentUser, ticket },
  };
}

export default TicketDetailPage;

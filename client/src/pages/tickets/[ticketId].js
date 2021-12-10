import React from "react";
import getCurrentUser from "../../lib/auth";
import BaseLayout from "../../components/common/base-layout";

const TicketDetailPage = () => {
  return (
    <BaseLayout user={currentUser}>
      <h1>Ticket Detail Page</h1>
    </BaseLayout>
  );
};

export async function getServerSideProps({ req }) {
  const currentUser = await getCurrentUser(req.headers);

  return {
    props: currentUser,
  };
}

export default TicketDetailPage;

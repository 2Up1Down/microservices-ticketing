import React from "react";
import BaseLayout from "../../components/common/base-layout";
import getCurrentUser from "../../lib/auth";

const NewTicketPage = ({ currentUser }) => {
  return (
    <BaseLayout user={currentUser}>
      <h1>New Ticket</h1>
    </BaseLayout>
  );
};

export async function getServerSideProps({ req }) {
  const currentUser = await getCurrentUser(req.headers);

  return {
    props: currentUser,
  };
}

export default NewTicketPage;

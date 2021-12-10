import React, { useState } from "react";
import BaseLayout from "../../components/common/base-layout";
import getCurrentUser from "../../lib/auth";
import useRequest from "../../hooks/use-request";
import Error from "../../components/common/error";
import Router from "next/router";

const NewTicketPage = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push("/"),
  });

  const onBlur = () => {
    const value = parseFloat(price);
    console.log(value);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    doRequest();
  };

  return (
    <BaseLayout user={currentUser}>
      <h1>New Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            value={title}
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            value={price}
            className="form-control"
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Error errors={errors} />
        <button className="btn btn-primary">Submit</button>
      </form>
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

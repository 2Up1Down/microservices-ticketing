import React, { useEffect } from "react";
import Router from "next/router";

import useRequest from "../../hooks/use-request";
import BaseLayout from "../../components/common/base-layout";

const Signout = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);
  return <BaseLayout>Signing you out...</BaseLayout>;
};

export default Signout;

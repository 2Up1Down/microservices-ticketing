import axios from "axios";

const getCurrentUser = async (headers) => {
  try {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        withCredentials: true,
        headers: headers,
      }
    );

    return data;
  } catch (error) {
    return { currentUser: "null" };
  }
};

export default getCurrentUser;

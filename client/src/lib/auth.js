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

    const { currentUser } = data;
    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;

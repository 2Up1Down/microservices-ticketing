import axios from "axios";

const getAllTickets = async (headers) => {
  try {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/tickets",
      {
        withCredentials: true,
        headers: headers,
      }
    );

    return data;
  } catch (error) {
    return [];
  }
};

export default getAllTickets;

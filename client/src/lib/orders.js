import axios from "axios";

export const getAllOrders = async (headers) => {
  try {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/orders",
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

export const getOrderById = async (headers, orderId) => {
  try {
    const { data } = await axios.get(
      `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/orders/${orderId}`,
      {
        withCredentials: true,
        headers: headers,
      }
    );

    return data;
  } catch (error) {
    return {};
  }
};

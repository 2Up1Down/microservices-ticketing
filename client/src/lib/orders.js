import axios from "axios";

export const getAllOrders = async (headers) => {
  try {
    const { data } = await axios.get("http://www.spotz.ch/api/orders", {
      withCredentials: true,
      headers: headers,
    });

    return data;
  } catch (error) {
    return [];
  }
};

export const getOrderById = async (headers, orderId) => {
  try {
    const { data } = await axios.get(
      `http://www.spotz.ch/api/orders/${orderId}`,
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

import axios from "axios";

const getAllTickets = async (headers) => {
  try {
    const { data } = await axios.get("http://www.spotz.ch/api/tickets", {
      withCredentials: true,
      headers: headers,
    });

    return data;
  } catch (error) {
    return [];
  }
};

export const getTicketById = async (headers, ticketId) => {
  try {
    const { data } = await axios.get(
      `http://www.spotz.ch/api/tickets/${ticketId}`,
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

export default getAllTickets;

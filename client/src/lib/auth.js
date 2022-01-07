import axios from "axios";

const getCurrentUser = async (headers) => {
  try {
    const { data } = await axios.get(
      "http://www.spotz.ch/api/users/currentuser",
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

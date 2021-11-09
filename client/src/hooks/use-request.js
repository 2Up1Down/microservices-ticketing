import axios from 'axios';
import { useState } from 'react';

function useRequest({ url, method, body }) {
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios({
        method: method,
        url,
        data: body,
      });

      return response.data;
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return {
    doRequest,
    errors,
  };
}

export default useRequest;

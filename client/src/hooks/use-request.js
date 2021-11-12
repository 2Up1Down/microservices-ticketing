import axios from 'axios';
import {useState} from 'react';

function useRequest({url, method, body, onSuccess}) {
    const [errors, setErrors] = useState([]);

    const doRequest = async () => {
        try {
            setErrors([]);
            const response = await axios({
                method: method,
                url,
                data: body,
            });

            if (onSuccess) {
                onSuccess(response.data);
            }

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

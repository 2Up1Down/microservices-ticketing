import {useState} from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors} = useRequest({
        method: 'post',
        url: '/api/users/signup',
        body: {
            email,
            password,
        },
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Signup</h1>
            <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input
                    type='email'
                    className='form-control'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    className='form-control'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {errors.length > 0 && (
                <div className='alert alert-danger'>
                    <h4>Oooops....</h4>
                    <ul className='my-0'>
                        {errors.map((err) => (
                            <li key={err.message}> {err.message}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button className='btn btn-primary'>Sign up</button>
        </form>
    );
}

export default Signup;

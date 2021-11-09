import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });

      console.log(response.data);
      setErrors([]);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
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
      {errors && (
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

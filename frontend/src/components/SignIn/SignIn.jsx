import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      // Update the URL to point to your backend
      const response = await axios.post('https://nithwin-blog-api.vercel.app/auth/login', userData);

      // Assuming the response contains a token
      const { token } = response.data;

      // Store the JWT token in localStorage
      localStorage.setItem('authToken', token);

      alert('Login successful!');
      navigate('/home'); // Redirect to home or dashboard after successful login
    } catch (error) {
      console.error('Login error:', error);
      alert('Error logging in. Please check your credentials.');
    }
  };

  return (
    <main className='d-flex justify-content-center align-items-center Mainbackground' style={{ height: '100vh' }}>
      <form className='p-5 rounded-5 text-white shadow-lg' style={{ backgroundColor: '#353535' }} onSubmit={handleSubmit}>
        <div>
          <p className='text-center h5 babylonica-regular text-gradient gradient-text'>Nexus</p>
          <p className='text-center fw-bold h2'>Login</p>
        </div>
        <div className="form-group my-4">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </main>
  );
};

export default SignIn;

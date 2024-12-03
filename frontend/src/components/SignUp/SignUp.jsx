import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const userData = { email, username, password };

    try {
      const response = await axios.post('http://localhost:5000/auth/signup', userData);
      alert('Signup successful!');
      navigate('/signin');
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.response?.data?.error || 'Error signing up. Please try again.');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center Mainbackground' style={{ height: '100vh' }}>
      <form className='px-4 py-3 rounded-5 text-white shadow-lg' style={{ backgroundColor: '#353535' }} onSubmit={handleSubmit}>
        <div>
          <p className='text-center h5 babylonica-regular text-gradient'>Nexus</p>
          <p className='text-center fw-bold h2'>Sign Up</p>
        </div>
        {error && <p className="text-danger text-center">{error}</p>}
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
          <label htmlFor="exampleInputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="form-group my-4">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if username and password are 'admin'
    if (username === 'admin' && password === 'admin') {
      // If yes, navigate to "/resorts"
      navigate('/resorts');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="container d-flex justify-content-center p-5 m-auto text-center content bg-ivory">
    <div className="card p-5 content bg-whitesmoke text-center">
      <h2>Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="form-group row pb-1">
          <label className='d-flex justify-content-start p-1'>Username:</label>
          <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='form-control'
          />
          </div>
          
        </div>
        <div className="form-group row pb-1">
          <label className='d-flex justify-content-start p-1'>Password:</label>
          <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='form-control'
          />
          </div>
          <div className='p-3 d-flex justify-content-center'>
          <button type="submit" className='btn btn-primary w-50'>Login</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}
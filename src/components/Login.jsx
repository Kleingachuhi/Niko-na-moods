import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://niko-na-mamoods.onrender.com/users');
      const users = await response.json();
      
      const isValidUser = users.some(user => 
        user.username.toLowerCase() === formData.username.toLowerCase() && 
        user.password.toLowerCase() === formData.password.toLowerCase()
      );

      if (isValidUser) {
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/f7/52/0b/f7520b191a02451117c462faf7c87159.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative rounded-xl shadow-2xl overflow-hidden w-full max-w-2xl min-h-[600px] border border-white/20 flex items-center bg-[#2D3748]">
        <div className="w-full p-12 space-y-8 relative z-10">
          <div className="text-center">
            <h2 className="text-5xl font-light tracking-wider text-white mb-3">MoodMate</h2>
            <p className="text-white/80 text-lg font-light tracking-wider">EMBRACE YOUR EMOTIONAL JOURNEY</p>
            <div className="mt-6 mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
            </div>
          </div>

          {error && (
            <div className="bg-rose-100/90 text-rose-800 px-5 py-3 rounded-md text-base border border-rose-300/50">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-base font-light text-white mb-2">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all text-base"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-base font-light text-white mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all text-base"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-white/10 text-white py-4 rounded-lg font-light tracking-wider hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-white/10 text-lg mt-8 border border-white/20"
            >
              Log in
            </button>
          </form>

          <p className="text-sm text-center text-white/60 font-light mt-8">
            Your emotional well-being matters. Begin your journey today.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
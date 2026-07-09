import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import api from '../../../shared/api/axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    api.post('/auth/login', { email, password })
      .then((res) => {
        setLoading(false);
        const { token, user } = res.data;
        sessionStorage.setItem('sarvo_token', token);
        sessionStorage.setItem('sarvo_user', JSON.stringify({
          ...user,
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
        }));
        
        // Redirect based on role
        if (user.role === 'SUPER_ADMIN' || user.role === 'Super Admin') {
          navigate('/superadmin/analytics');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="auth-error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="auth-form-group">
        <label className="auth-label">Email Address</label>
        <div className="auth-input-wrapper">
          <Mail className="auth-input-icon" size={16} />
          <input
            type="email"
            className="auth-input"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className="auth-form-group">
        <label className="auth-label">Password</label>
        <div className="auth-input-wrapper">
          <Lock className="auth-input-icon" size={16} />
          <input
            type="password"
            className="auth-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className="auth-options">
        <label className="auth-remember">
          <input type="checkbox" disabled={loading} />
          <span>Remember me</span>
        </label>
        <Link to="/auth/forgot-password" className="auth-link">
          Forgot Password?
        </Link>
      </div>

      <button type="submit" className="auth-submit-btn" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            <span>Signing In...</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </button>

      <div className="auth-footer">
        Don't have an account?{' '}
        <Link to="/auth/register" className="auth-link">
          Register here
        </Link>
      </div>
    </form>
  );
}

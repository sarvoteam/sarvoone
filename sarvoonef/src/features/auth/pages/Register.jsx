import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, AlertCircle, Loader2 } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!businessName || !fullName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Auto login on register
      sessionStorage.setItem('sarvo_token', 'mock_jwt_token_xxxxxx');
      sessionStorage.setItem('sarvo_user', JSON.stringify({
        name: fullName,
        email: email,
        role: 'Super Admin',
        businessName: businessName,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
      }));
      navigate('/dashboard');
    }, 1000);
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
        <label className="auth-label">Business / Shop Name</label>
        <div className="auth-input-wrapper">
          <Briefcase className="auth-input-icon" size={16} />
          <input
            type="text"
            className="auth-input"
            placeholder="Sarvo Retailers"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className="auth-form-group">
        <label className="auth-label">Full Name</label>
        <div className="auth-input-wrapper">
          <User className="auth-input-icon" size={16} />
          <input
            type="text"
            className="auth-input"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

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

      <button type="submit" className="auth-submit-btn" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            <span>Creating Account...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </button>

      <div className="auth-footer">
        Already have an account?{' '}
        <Link to="/auth/login" className="auth-link">
          Sign In
        </Link>
      </div>
    </form>
  );
}

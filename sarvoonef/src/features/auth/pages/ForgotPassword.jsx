import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div>
      {success ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', color: '#10b981', marginBottom: '16px' }}>
            <CheckCircle2 size={48} />
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1f2937' }}>Reset link sent!</h3>
          <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#6b7280', lineHeight: '140%' }}>
            We've sent password reset instructions to your email address.
          </p>
          <Link to="/auth/login" className="auth-submit-btn" style={{ textDecoration: 'none' }}>
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 20px 0', lineHeight: '145%' }}>
            Enter the email address associated with your account and we will send you a link to reset your password.
          </p>

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

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>Sending link...</span>
              </>
            ) : (
              <span>Send Reset Link</span>
            )}
          </button>

          <div className="auth-footer">
            Remembered your password?{' '}
            <Link to="/auth/login" className="auth-link">
              Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

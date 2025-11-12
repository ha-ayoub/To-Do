import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import '../../styles/Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('The passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('The password must contain at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <UserPlus />
          </div>
          <h1 className="auth-title">Registration</h1>
          <p className="auth-subtitle">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              <AlertCircle className="error-icon" />
              <span>{error}</span>
            </div>
          )}

          <div className="form-row">
            <div className="form-group-auth">
              <label htmlFor="firstName">First name</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Leonard"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group-auth">
              <label htmlFor="lastName">Last Name</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="De Vinci"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="form-group-auth">
            <label htmlFor="email">E-mail</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your@email.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group-auth">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={8}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group-auth">
            <label htmlFor="confirmPassword">Confirm password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner"></div>
                Registration is in progress...
              </>
            ) : (
              <>
                <UserPlus className="button-icon" />
                Register
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
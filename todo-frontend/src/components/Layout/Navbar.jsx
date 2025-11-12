import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, LogOut, UserRound } from 'lucide-react';
import logo from "../../assets/to-do-list.png"
import '../../styles/Navbar.css';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    const result = await Swal.fire({
      title: "Are you sure you want to log off ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d8b803ff",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Logout !"
    });

    if (result.isConfirmed) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo-content">
            <div className="navbar-logo-icon">
              <img src={logo} />
            </div>
            <div className="navbar-logo-text">
              <h1>Todo App</h1>
              <p>Manage your tasks efficiently</p>
            </div>
          </div>
        </Link>

        <div className="navbar-menu">
          {user && (
            <div className="navbar-user">
              <span className="navbar-username">
                {user.firstName} {user.lastName}
              </span>
              <div className="navbar-dropdown">
                <button className="navbar-avatar">
                  <UserRound />
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <User className="dropdown-icon" />
                    My profile
                  </Link>
                  <hr className="dropdown-divider" />
                  <button onClick={handleLogout} className="dropdown-item">
                    <LogOut className="dropdown-icon" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
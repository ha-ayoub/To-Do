import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogOut } from 'lucide-react';
import ProfileTab from './ProfileTab';
import SecurityTab from './SecurityTab';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/ProfileLayout.css';
import Swal from 'sweetalert2';

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState('profile');
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

  const menuItems = [
    {
      id: 'profile',
      label: 'My profile',
      icon: User,
      component: ProfileTab
    },
    {
      id: 'security',
      label: 'Security',
      icon: Lock,
      component: SecurityTab
    }
  ];

  const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component;

  return (
    <div className="profile-layout">
      <aside className="profile-sidebar">
        <div className="sidebar-user-card">
          <div className="sidebar-avatar">
            <User size={50} />
          </div>
          <h3 className="sidebar-user-name">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="sidebar-user-email">{user?.email}</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              >
                <Icon className="nav-item-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="sidebar-divider"></div>
          <button
            onClick={handleLogout}
            className="sidebar-nav-item logout-item"
          >
            <LogOut className="nav-item-icon" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      <main className="profile-content">
        {ActiveComponent && <ActiveComponent />}
      </main>
    </div>
  );
};

export default ProfileLayout;
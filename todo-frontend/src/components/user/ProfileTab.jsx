import { useState, useEffect } from 'react';
import { userService } from '../../services/authService';
import { AlertCircle } from 'lucide-react';
import ProfileInfoTab from './ProfileInfoTab';
import ProfileUpdateTab from './ProfileUpdateTab';

const ProfileTab = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await userService.getProfile();
      setProfile(data);
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber || '',
      });
    } catch (err) {
      setError('Error loading profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await userService.updateProfile(formData);
      await fetchProfile();
      setEditing(false);
    } catch (err) {
      setError('Error during update');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="tab-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-tab">
      <div className="tab-header">
        <h1 className="tab-title">My profile</h1>
        <p className="tab-subtitle">Manage your personal information</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {!editing ? (

        <ProfileInfoTab profile={profile} setEditing={setEditing}/>

      ) : (
        <ProfileUpdateTab 
          formData={formData} 
          profile={profile} 
          loading={loading} 
          setFormData={setFormData} 
          setEditing={setEditing}
          handleUpdate={handleUpdate}
          />
      )}
    </div>
  );
};

export default ProfileTab;
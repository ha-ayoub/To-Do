import { useState } from 'react';
import { authService, userService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { getPasswordStrength } from '../../utils/helper';
import ChangePassword from './ChangePassword';
import DeleteProfile from './DeleteProfile';
import Swal from 'sweetalert2';

const SecurityTab = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
        setSuccess('');
    };

    const passwordStrength = getPasswordStrength(formData.newPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.newPassword !== formData.confirmNewPassword) {
            setError('The new passwords do not match');
            return;
        }

        if (formData.newPassword.length < 8) {
            setError('The new password must contain at least 8 characters.');
            return;
        }

        if (formData.currentPassword === formData.newPassword) {
            setError('The new password must be different from the old one.');
            return;
        }

        setLoading(true);

        try {
            await authService.changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmNewPassword: formData.confirmNewPassword,
            });

            setSuccess('Password changed successfully!');
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            });

            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error changing password');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCompleted = async () => {

        const result = await Swal.fire({
            title: "Are you sure you want to delete your profile permanently?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            setLoading(true);
            setError('');

            try {
                await userService.deleteAccount();

                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');

                navigate('/login', { replace: true });
            } catch (err) {
                setError(err.response?.data?.message || 'Erreur lors de la suppression du compte');
                setLoading(false);
            }
        }
    };

    return (
        <div className="security-tab">
            <ChangePassword
                error={error}
                loading={loading}
                success={success}
                handleSubmit={handleSubmit}
                formData={formData}
                handleChange={handleChange}
                passwordStrength={passwordStrength} />

            <DeleteProfile error={error} handleDeleteCompleted={handleDeleteCompleted} />
        </div>
    );
};

export default SecurityTab;
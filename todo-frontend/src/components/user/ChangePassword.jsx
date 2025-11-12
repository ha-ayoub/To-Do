import { AlertCircle, CheckCircle, Lock, Shield } from "lucide-react";

export default function ChangePassword({error, loading, success, handleSubmit, formData, handleChange, passwordStrength}) {
    return (
        <>
            <div className="tab-header">
                <h1 className="tab-title">Change password</h1>
                <p className="tab-subtitle">Make sure you use a strong password</p>
            </div>

            <div className="security-tips">
                <div className="tips-header">
                    <Shield size={20} />
                    <h3>Safety tips</h3>
                </div>
                <ul className="tips-list">
                    <li>Use at least 8 characters</li>
                    <li>Combine uppercase letters, lowercase letters, numbers, and symbols</li>
                    <li>Do not use personal information</li>
                </ul>
            </div>

            <div className="profile-section">

                {error && (
                    <div className="alert alert-error">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="alert alert-success">
                        <CheckCircle size={20} />
                        <span>{success}</span>
                    </div>
                )}

                <div onSubmit={handleSubmit} className="security-form">
                    <div className="form-group">
                        <label htmlFor="currentPassword">
                            <Lock size={16} />
                            Current password
                        </label>
                        <input
                            id="currentPassword"
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-divider"></div>

                    <div className="form-group">
                        <label htmlFor="newPassword">
                            <Lock size={16} />
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            minLength={8}
                            disabled={loading}
                        />
                        {formData.newPassword && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div
                                        className="strength-fill"
                                        style={{
                                            width: passwordStrength.width,
                                            backgroundColor: passwordStrength.color
                                        }}
                                    ></div>
                                </div>
                                <span className="strength-label" style={{ color: passwordStrength.color }}>
                                    {passwordStrength.label}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmNewPassword">
                            <Lock size={16} />
                            Confirm the new password
                        </label>
                        <input
                            id="confirmNewPassword"
                            type="password"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            minLength={8}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            onClick={handleSubmit}
                            className="ChangePassword-btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner-small"></div>
                                    Change in progress...
                                </>
                            ) : (
                                <>
                                    <Lock size={18} />
                                    Change password
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
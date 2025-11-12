export default function ProfileUpdateTab({formData, profile, loading, setFormData, setEditing, handleUpdate}) {
    return (
        <>
            <div onSubmit={handleUpdate} className="profile-form">
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label>Phone number</label>
                    <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        disabled={loading}
                        placeholder="Optional"
                    />
                </div>

                <div className="form-actions">
                    <button
                        onClick={handleUpdate}
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="spinner-small"></div>
                                Registration...
                            </>
                        ) : (
                            'Enregistrer'
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setEditing(false);
                            setFormData({
                                firstName: profile.firstName,
                                lastName: profile.lastName,
                                phoneNumber: profile.phoneNumber || '',
                            });
                        }}
                        className="btn btn-secondary"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}
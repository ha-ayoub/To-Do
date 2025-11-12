import { AlertCircle, Trash2 } from "lucide-react";

export default function DeleteProfile({ error, handleDeleteCompleted }) {
    return (
        <>
            <br/>
            <div className="form-divider"></div>
            <div className="danger-section">
                <div className="danger-header">
                    <div className="danger-title">
                        <Trash2 size={20} />
                        <h2>Delete my account</h2>
                    </div>
                </div>

                <div className="danger-description">
                    <p>Once your account is deleted:</p>
                    <ul>
                        <li>All your personal data will be permanently deleted</li>
                        <li>All your tasks will be lost</li>
                        <li>This action cannot be undone</li>
                        <li>You will not be able to recover your account</li>
                    </ul>
                </div>

                {error && (
                    <div className="alert alert-error">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}
                <button
                    onClick={() => handleDeleteCompleted()}
                    className="btn btn-danger"
                >
                    <Trash2 size={18} />
                    I want to delete my account
                </button>
            </div>
        </>

    )
}
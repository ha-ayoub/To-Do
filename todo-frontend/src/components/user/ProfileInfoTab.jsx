import { Calendar, Mail, User } from "lucide-react";

export default function ProfileInfoTab({profile, setEditing}) {
    return (
        <>
            <div className="profile-info">
                <div className="info-group">
                    <User className="info-icon" />
                    <div>
                        <label>Full name</label>
                        <p>{profile?.firstName} {profile?.lastName}</p>
                    </div>
                </div>

                <div className="info-group">
                    <Mail className="info-icon" />
                    <div>
                        <label>Email</label>
                        <p>{profile?.email}</p>
                    </div>
                </div>

                <div className="info-group">
                    <Calendar className="info-icon" />
                    <div>
                        <label>Member since</label>
                        <p>{new Date(profile?.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                </div>

                <button onClick={() => setEditing(true)} className="profile-edit-btn">
                    Edit profile
                </button>
            </div></>
    )
}
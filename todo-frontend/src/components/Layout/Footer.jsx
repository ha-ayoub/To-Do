import Signature from "../Signature";

export default function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                 <span>Using React & .NET Core | Version 1.0.0</span>
                 <Signature />
            </div>
        </footer>
    )
}
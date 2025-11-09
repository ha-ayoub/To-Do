import { CheckSquare } from "lucide-react";
import logo from "../../assets/to-do-list.png"

export default function Header() {
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="header-icon">
                    <img src={logo}/>
                </div>
                <div className="header-text">
                    <h1>Todo App</h1>
                    <p>Manage your tasks efficiently</p>
                </div>
            </div>
        </header>
    )
}
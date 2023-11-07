import { useEffect, useState } from "react";
import "./AuthMenu.css";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { NavLink } from "react-router-dom";

function AuthMenu(): JSX.Element {

    // Menage user local state:
    const [user, setUser] = useState<UserModel>();

    // Go to backend once and get the user:
    useEffect(() => {
        setUser(authStore.getState().user); // Init user state.
        const unsubscribe = authStore.subscribe(() => setUser(authStore.getState().user)); // Subscribe to changes on user state.
        return unsubscribe; // Stop tracking changes when the component destroys.
    }, []);

    // Invoked when the user clicks the logout button (sets the new state for user and token to null):
    function logoutUser(): void {
        authService.logout();
        notifyService.success("להתראות!");
    }

    return (
        <div className="AuthMenu">
            
            {user &&
            <div>
                <span>שלום {user.firstName} {user.lastName} | </span>
                <NavLink to={"/register"} onClick={logoutUser}>התנתק/י</NavLink>
            </div>
            }

        </div>
    );
}

export default AuthMenu;

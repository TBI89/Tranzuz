import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";
import {createStore} from "redux";

// 1. Global state:
export class AuthState {

    // Init user & token state:
    public token: string = null;
    public user: UserModel = null;

    // Retrieve token from storage, if exist - decode it:
    public constructor() {
        this.token = sessionStorage.getItem("token");
        if (this.token) {
            this.user = jwtDecode<{ user: UserModel }>(this.token).user;
        }
    }

}

// 2. Action type:
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// 3. Action object:
export interface AuthActionObject {
    type: AuthActionType,
    payload?: string
}

// 4. Reducer:
export function authReducer(currentState = new AuthState(), action: AuthActionObject): AuthState {

    // Clone the current state and add to it to create the new state:
    const newState = { ...currentState };

    // Handle auth actions:
    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload;
            newState.user = jwtDecode<{ user: UserModel }>(newState.token).user;
            sessionStorage.setItem("token", newState.token);
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            sessionStorage.removeItem("token");
            break;
    }

    return newState;
}

// 5. Store:
export const authStore = createStore(authReducer);


import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";
import { createStore } from "redux";

// 1. create state (class)
export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    public constructor (){
        this.token = localStorage.getItem("token");
        if (this.token){
            this.user = jwtDecode<{ user: UserModel }>(this.token).user; 
        }
    }
}

// 2.action types (enum)
export enum AuthActionType {
    Register,
    Login,
    Logout
}

// 3. action (interface)
export interface AuthAction {
    type: AuthActionType;
    payload?: string; 
}

// 4. reducer (function)
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    // create new state 
    const newState = {...currentState};

    switch(action.type) {

        case AuthActionType.Register: // payload is a token

        //if user preforms register and login we want to do the same thing

        case AuthActionType.Login: // payload is a token
            newState.token = action.payload;
            newState.user = jwtDecode<{ user: UserModel }>(action.payload).user;

            localStorage.setItem("token", newState.token );
        break;    
        
        case AuthActionType.Logout: // no payload here
            newState.token = null;
            newState.user = null; 
            localStorage.removeItem("token");
        break;    
    }

    return newState;
}
// 5. store (const)
export const authStore = createStore(authReducer);
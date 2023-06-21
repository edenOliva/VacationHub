import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import "./AuthMenu.css";
import { NavLink } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { authStore } from "../../../Redux/AuthState";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel> ();

    useEffect (() => {

        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {

        setUser(authStore.getState().user);

        });

        return () => unsubscribe();

    }, []);
    
    function logout():void{
        authService.logout();
        notifyService.success("Miss you already");
    }

    return (
        <div className="AuthMenu">
			{!user && <>
            
                <span>Hello guest ! </span>
                <span>|</span>
                <NavLink to="/login">login</NavLink>
                <span>|</span>
                <NavLink to="/register">register</NavLink>
            </>}

            {user && <>
        
                <span>Hi {user.firstName} {user.lastName} </span>
                <span>|</span>
                <NavLink to="/home" >home</NavLink>
                <span>|</span>
                <NavLink to="/login" onClick={ logout } >logout</NavLink>
            </>}
        </div>
    );
}

export default AuthMenu;

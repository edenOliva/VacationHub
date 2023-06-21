import { NavLink, Outlet } from "react-router-dom";
import "./Menu.css";
import { authStore } from "../../../Redux/AuthState";
import RoleModel from "../../../Models/RoleModel";
import FilterButtons from "../../DataArea/UserButtons/filterButtons";

function Menu(): JSX.Element {
    
    const user = authStore.getState().user;

    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            
			<NavLink to="/list">Vacations</NavLink>
            {user?.roleId === RoleModel.User && <FilterButtons /> }

            {user?.roleId === RoleModel.Admin && <> 
            <NavLink to="/vacations/followers-chart">Followers chart</NavLink>
            <NavLink to="/insert">Add vacation</NavLink></>}
			<br />

            <Outlet />
        </div>
    );
}

export default Menu;

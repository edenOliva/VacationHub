import { NavLink } from "react-router-dom";
import "./filterButtons.css";

function FilterButtons(): JSX.Element {
    return (
        <div className="filterButtons">
            <NavLink to={"/liked-vacations"}>Liked vacations</NavLink>
            <NavLink to={"/vacations-to-come"}>Vacations to come</NavLink>
            <NavLink to={"/active-vacations"}>Active vacations</NavLink>
        </div>
    );
}

export default FilterButtons;

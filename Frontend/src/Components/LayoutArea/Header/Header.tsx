import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";
function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu />
            <br />
			<h1>VacationHub</h1>
            <span>kitties around the world</span>
        </div>
    );
}

export default Header;

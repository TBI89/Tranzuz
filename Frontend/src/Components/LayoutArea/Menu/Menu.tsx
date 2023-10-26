import { NavLink } from "react-router-dom";
import "./Menu.css";
import homePageLogo from "../../../Assets/Images/home-page-logo.webp";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <nav className="nav flex-column">
                <NavLink className="nav-link active" aria-current="page" to="/home"><img width="60px" src={homePageLogo} /></NavLink>
                <NavLink className="nav-link active" aria-current="page" to="/missions">כל המשימות</NavLink>
                <NavLink className="nav-link active" aria-current="page" to="/#">קישור 3 </NavLink>
                <NavLink className="nav-link active" aria-current="page" to="/#">קישור 4 </NavLink>
                <NavLink className="nav-link active" aria-current="page" to="/#">קישור 5 </NavLink>
                <NavLink className="nav-link active" aria-current="page" to="/#">קישור 6 </NavLink>
            </nav>
        </div>
    );
}

export default Menu;

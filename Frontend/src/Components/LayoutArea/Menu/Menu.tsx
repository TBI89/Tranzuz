import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">דף הבית</NavLink>
            <span> | </span>
			<NavLink to="/missions">כל המשימות</NavLink>
        </div>
    );
}

export default Menu;

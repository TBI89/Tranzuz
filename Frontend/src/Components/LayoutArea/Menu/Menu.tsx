import { NavLink } from "react-router-dom";
import "./Menu.css";
import homePageLogo from "../../../Assets/Images/home-page-logo.webp";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { useState } from "react";
import MenuModel from "../../../Models/MenuModel";

function Menu(): JSX.Element {

    // Manege the dropdown menu state:
    const [isDropdownVisible, setIsDropdownVisible] = useState<MenuModel>({
        microMobility: false,
        publicTransportation: false,
        shipping: false,
        privateTrans: false,
    });

    // When the user clicks the dropdown menu, set the state to true (display the content in the DropdownMenu class):
    function handleNavLinkClick(event: React.MouseEvent<HTMLAnchorElement>) { // Handle the onClick event.
        const dropdownName = event.currentTarget.getAttribute("data-dropdown-name"); // Extract dropdown's name.
        if (dropdownName) { // Check that the dropdown exist.
            setIsDropdownVisible(prevState => ({
                ...prevState,
                [dropdownName]: !prevState[dropdownName as keyof MenuModel]
            }));
        }
    };

    return (
        <div className="Menu">
            <nav className="nav flex-column">

                <NavLink className="nav-link active" aria-current="page" to="/missions"><img src={homePageLogo} /></NavLink>

                <div className="MainNavLinkContainer">
                    <NavLink to={"#"} onClick={handleNavLinkClick} data-dropdown-name="microMobility"><DirectionsBikeIcon htmlColor="black" /></NavLink>
                    <div className={`DropdownContainer ${isDropdownVisible.microMobility ? "visible" : "hidden"}`}>
                        <NavLink className="nav-link active" aria-current="page" to="/#">מיקרו מוביליטי</NavLink>
                    </div>
                </div>

                <div className="MainNavLinkContainer">
                    <NavLink to={"#"} onClick={handleNavLinkClick} data-dropdown-name="publicTransportation"><DirectionsBusIcon htmlColor="black" /></NavLink>
                    <div className={`DropdownContainer ${isDropdownVisible.publicTransportation ? "visible" : "hidden"}`}>
                        <NavLink className="nav-link active" aria-current="page" to="/missions">יומן סדרן תח"צ </NavLink>
                        <NavLink className="nav-link active" aria-current="page" to="/#">מפות תכנון</NavLink>
                    </div>
                </div>

                <div className="MainNavLinkContainer">
                    <NavLink to={"#"} onClick={handleNavLinkClick} data-dropdown-name="shipping"><LocalShippingIcon htmlColor="black" /></NavLink>
                    <div className={`DropdownContainer ${isDropdownVisible.shipping ? "visible" : "hidden"}`}>
                        <NavLink className="nav-link active" aria-current="page" to="/#">תובלה קרקעית</NavLink>
                        <NavLink className="nav-link active" aria-current="page" to="/#">שילוח ימי</NavLink>
                    </div>
                </div>

                <div className="MainNavLinkContainer">
                    <NavLink to={"#"} onClick={handleNavLinkClick} data-dropdown-name="privateTrans"><LocalTaxiIcon htmlColor="black" /></NavLink>
                    <div className={`DropdownContainer ${isDropdownVisible.privateTrans ? "visible" : "hidden"}`}>
                        <NavLink className="nav-link active" aria-current="page" to="/#">תכנון מסלולים</NavLink>
                    </div>
                </div>


            </nav>
        </div>
    );
}

export default Menu;

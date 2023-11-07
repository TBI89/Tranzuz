import { useEffect, useState } from "react";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import { authStore } from "../../../Redux/AuthState";

function Layout(): JSX.Element {

    // Track local state for the user (logged in or not):
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setIsLoggedIn(authStore.getState().token !== null); // Check if there's a token (logged in user) and update the state
        const unsubscribe = authStore.subscribe(() => { // Track the changes in the auth store.
            setIsLoggedIn(authStore.getState().token !== null);
        });
        return () => unsubscribe(); // Stop tracking when the component destroys.
    }, []);

    return (
        <div className="Layout">

            <header>
                <AuthMenu />
            </header>

            <aside>
                {/* Display the component only if the user logged in: */}
                {isLoggedIn && <Menu />}
            </aside>

            <main>
                <Routing />
            </main>

            <footer>
                <Footer />
            </footer>

        </div>
    );
}

export default Layout;

import "./Home.css";
import homePageImage from "../../../Assets/Images/home-page-image.jpg";
import useTitle from "../../../Utils/UseTitle";

function Home(): JSX.Element {

    useTitle("Tranzuz | Home");
    
    return (
        <div className="Home">
            <img src={homePageImage} />
        </div>
    );
}

export default Home;

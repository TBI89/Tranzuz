import "./Home.css";
import homePageImage from "../../../Assets/Images/home-page-image.jpg";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <img src={homePageImage} />
        </div>
    );
}

export default Home;

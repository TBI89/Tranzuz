import useTitle from "../../../Utils/UseTitle";
import "./Home.css";
// @ts-ignore
import homePageClip from "../../../Assets/Videos/home-page-clip.mp4";

function Home(): JSX.Element {

    useTitle("Tranzuz | Home");

    return (
        <div className="Home">
            <video autoPlay loop muted className="HomePageClip">
                <source src={homePageClip} type="video/mp4" />
            </video>
        </div>
    );
}

export default Home;

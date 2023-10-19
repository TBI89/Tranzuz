import "./PageNotFound.css";
import pageNotFoundImage from "../../../Assets/Images/page-not-found.jpg";
import useTitle from "../../../Utils/UseTitle";

function PageNotFound(): JSX.Element {

    useTitle("Page Not Found");

    return (
        <div className="PageNotFound">
            <img src={pageNotFoundImage} />
        </div>
    );
}

export default PageNotFound;

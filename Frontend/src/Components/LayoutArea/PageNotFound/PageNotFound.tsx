import "./PageNotFound.css";
import image from "../../../Assets/Images/pageNotFound.jpg"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">

            <h2>Sorry, the page you are looking for is still on vacation</h2>
            <br />
            <img src={image} />
        </div>
    );
}

export default PageNotFound;

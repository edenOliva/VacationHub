import "./Home.css";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home(): JSX.Element {

    const user = authStore.getState().user;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            notifyService.error('please login');
            navigate('/login')
        }
    }, []);


    return (
        <div className="Home">
            <h4>where do you want to drink your coffee tomorrow ? </h4>
            <br />
            <div id="container">
                <div className="steam" id="steam1"> </div>
                <div className="steam" id="steam2"> </div>
                <div className="steam" id="steam3"> </div>
                <div className="steam" id="steam4"> </div>

                <div id="cup">
                    <div id="cup-body">
                        <div id="cup-shade"></div>
                    </div>
                    <div id="cup-handle"></div>
                </div>

                <div id="saucer"></div>

                <div id="shadow"></div>
            </div>

        </div>
    );
}

export default Home;

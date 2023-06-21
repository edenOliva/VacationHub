import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Login(): JSX.Element {

    const {register, handleSubmit} = useForm<CredentialsModel>();

    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome back")
            navigate("/list");
            
        } catch (err: any) {
            notifyService.error(err);
        }        
    }
    
    return (
        <div className="Login form">

			{/* <h2>Login</h2> */}

            <form onSubmit={handleSubmit(send)}>

                <label>email</label>
                <input type="email" required {...register("email")}/>

                <label>password</label>
                <input type="password" min="4" max="50" required {...register("password")}/>

                <button>Login</button>

                <div className="NotSubscribed">
                <br />
                <span>not subscribed yet?</span>
                <br />

                <NavLink to="/register" >register</NavLink> 
                </div>
            </form>
        </div>
    );
}

export default Login;

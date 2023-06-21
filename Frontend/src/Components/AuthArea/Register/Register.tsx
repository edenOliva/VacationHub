import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();

    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome");
            navigate("/list");

        } catch (error: any) {
            notifyService.error(error);
        }
    }

    return (
        <div className="Register form">

            <form onSubmit={handleSubmit(send)}>
                <label>first name:</label>
                <input type="text" min="3" max="25" required {...register("firstName")} />

                <label>last name</label>
                <input type="text" min="3" max="30" required {...register("lastName")} />

                <label>email</label>
                <input type="email" required {...register("email")} />

                <label>password</label>
                <input type="password" min="4" max="50" required {...register("password")} />

                <button>Register</button>

                <div className="AlreadyMember">
                    <br />
                    <span>already a member?</span>
                    <br />

                    <NavLink to="/login" >login</NavLink>
                </div>
            </form>
        </div>
    );
}

export default Register;

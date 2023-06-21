import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import { useNavigate } from "react-router-dom";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { authStore } from "../../../Redux/AuthState";
import { useEffect } from "react";
import RoleModel from "../../../Models/RoleModel";

function Insert(): JSX.Element {

    const user = authStore.getState().user;
    const { register, handleSubmit } = useForm<VacationModel>();

    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            notifyService.error('please login');
            navigate('/login');
        }
        if(user.roleId === RoleModel.User){
            notifyService.error('Access denied');
            navigate('/home');
        }
    })
        
    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationsService.addVacation(vacation);
            notifyService.success("Product has been added");
            navigate("/home");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Insert Box">

            <form onSubmit={handleSubmit(send)}>

                <label>Destination:</label>
                <input type="text" {...register("destination")} required minLength={2} maxLength={30} />

                <label>Description:</label>
                <textarea {...register("description")} required minLength={10} maxLength={300} />

                <label>Start:</label>
                <input type="date" {...register("startDate")} required />

                <label>End:</label>
                <input type="date" {...register("endDate")} required />

                <label>Price:</label>
                <input type="number" step="0.1"{...register("price")} required />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Add</button>

            </form>

        </div>
    );
}

export default Insert;

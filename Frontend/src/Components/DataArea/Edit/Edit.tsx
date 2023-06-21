import { useEffect, useState } from "react";
import "./Edit.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { authStore } from "../../../Redux/AuthState";

function Edit(): JSX.Element {

    const user = authStore.getState().user;
    const params = useParams();
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const [vacation, setVacation] = useState<VacationModel>();
    const navigate = useNavigate();

    // Get vacation to edit
    useEffect(() => {
        if(!user){
            notifyService.error('please login');
            navigate('/login')
        };

        const id = +params.vacationId;
        vacationsService.getOneVacation(id)
            .then(responseVacation => {
                setValue("vacationId", responseVacation.vacationId);
                setValue("destination", responseVacation.destination);
                setValue("description", responseVacation.description);
                setValue("startDate", new Date(responseVacation.startDate).toISOString().substr(0, 10));
                setValue("endDate", new Date(responseVacation.endDate).toISOString().substr(0, 10));
                setValue("price", responseVacation.price);
                setVacation(responseVacation);
            })
            .catch(err => {
                notifyService.error(err);
                navigate('/home') 
            });

    }, []);

    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            
            await vacationsService.editVacation(vacation);
            notifyService.success("Vacation has been updated");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }


    return (
        <div className="Edit Box">

            <h2>Edit Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                <input type="hidden"  {...register("vacationId")} />

                <label>Destination:</label>
                <input type="text" {...register("destination")} />

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

                <img src={vacation?.imageUrl} />

                <button>Update</button>

            </form>
        </div>
    );
}

export default Edit;

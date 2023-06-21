import { useEffect, useState } from "react";
import { authStore } from "../../../../Redux/AuthState";
import VacationModel from "../../../../Models/VacationModel";
import VacationsService from "../../../../Services/VacationsService";
import notifyService from "../../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import Card from "../../Card/Card";

function LikedVacations(): JSX.Element {

    const user = authStore.getState().user;
    const [vacations, setVacations] = useState<VacationModel[]>();

    const navigate = useNavigate();

    useEffect(() => {
        if (user?.userId) {
            fetchVacations();
        }

    }, [user]);

    async function fetchVacations() {
        try {
            const allVacations = await VacationsService.getAllVacations();
            const userLikes = await VacationsService.getLikesByUser(user.userId);

            const filteredVacations = allVacations.filter((vacation) =>
                userLikes.some((like) => like.vacationId === vacation.vacationId)
            );
            setVacations(filteredVacations);

        } catch (err) {
            notifyService.error(err);
            navigate('/login');
        }
    }

    return (
        <div className="LikedVacations">

            <h2>Liked Vacations</h2>

            {vacations?.map(c => <Card key={c.vacationId} vacation={c} />)}
        </div>
    );
}

export default LikedVacations;

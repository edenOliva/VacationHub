import { useEffect, useState } from "react";
import VacationsService from "../../../../Services/VacationsService";
import notifyService from "../../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import Card from "../../Card/Card";

function ActiveVacations(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>();

    const navigate = useNavigate();

    useEffect(() => {
            fetchVacations();
        
    }, []);

    async function fetchVacations() {
        try {
            const response = await VacationsService.getAllVacations();
            const currentDate = new Date();
            const filteredVacations = response.filter(v =>
                new Date(v.startDate) < currentDate && new Date(v.endDate) > currentDate
            );
            setVacations(filteredVacations);

        } catch (err) {
            notifyService.error(err);
            navigate('/login');
        }
    }

    return (
        <div className="ActiveVacations">
            <h2>Active Vacations</h2>

            {vacations?.map(c => <Card key={c.vacationId} vacation={c} />)}
        </div>
    );
}

export default ActiveVacations;

import { useEffect, useState } from "react";
import notifyService from "../../../../Services/NotifyService";
import VacationsService from "../../../../Services/VacationsService";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import Card from "../../Card/Card";

function VacationsToCome(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>();

    const navigate = useNavigate();

    useEffect(() => {

            fetchVacations();
        
    }, []);

    async function fetchVacations() {
        try {
            const response = await VacationsService.getAllVacations();
            const filteredVacations = response.filter((v) => new Date(v.startDate) > new Date());
            setVacations(filteredVacations);

        } catch (err) {
            notifyService.error(err);
            navigate('/login');
        }
    }

    return (
        <div className="VacationsToCome">
            <h2>Vacations To Come</h2>

            {vacations?.map(c => <Card key={c.vacationId} vacation={c} />)}
        </div>
    );
}

export default VacationsToCome;

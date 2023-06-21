import { useEffect, useState } from "react";
import "./FollowersChart.css";
import VacationModel from "../../../../Models/VacationModel";
import { authStore } from "../../../../Redux/AuthState";
import VacationsService from "../../../../Services/VacationsService";
import notifyService from "../../../../Services/NotifyService";
import Chart from "../../../LayoutArea/Chart/Chart";
import RoleModel from "../../../../Models/RoleModel";
import { useNavigate } from "react-router-dom";

function FollowersChart(): JSX.Element {

    const user = authStore.getState().user;
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.roleId === RoleModel.Admin) {
            fetchVacations();

        } else {
            notifyService.error("Access denied");
            navigate("/home");
        }
    }, []);

    async function fetchVacations() {
        try {
            const response = await VacationsService.getAllVacations();
            setVacations(response);
        } catch (err) {
            notifyService.error(err);
        }
    }

    function exportToCSV() {
        const csvContent = "data:text/csv;charset=utf-8," + convertToCSV(vacations);
        const encodedURI = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedURI);
        link.setAttribute("download", "vacations.csv");
        document.body.appendChild(link);
        link.click();
    }

    function convertToCSV(data: VacationModel[]): string {
        const header = ["Destination", "Likes"].join(",");
        const rows = data
            .map((vacation) => [vacation.destination, vacation.likes])
            .map((row) => row.join(","));
        return [header, ...rows].join("\n");
    }

    return (
        <div className="FollowersChart">
            <h2>Followers Chart</h2>

            <button onClick={exportToCSV}>Export CSV</button>

            <Chart data={vacations} />
        </div>
    );
}

export default FollowersChart;

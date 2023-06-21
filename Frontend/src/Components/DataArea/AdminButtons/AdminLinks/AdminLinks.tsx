import { NavLink, useNavigate } from "react-router-dom";
import "./AdminLinks.css";
import vacationsService from "../../../../Services/VacationsService";
import notifyService from "../../../../Services/NotifyService";

interface AdminLinksProps {
    vacationId: number;
}

function AdminLinks(props: AdminLinksProps): JSX.Element {
    const navigate = useNavigate();

    async function deleteMe() {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await vacationsService.deleteVacation(props.vacationId);
            notifyService.success("Vacation has been deleted");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }
    return (
        <div className="AdminLinks">
            <NavLink className="DeleteLink" onClick={deleteMe} to={"/list"} >	&#128465; Delete</NavLink>
            <NavLink to={"/vacations/edit/" + props.vacationId}>&#9998; Edit</NavLink>
        </div>
    );
}

export default AdminLinks;

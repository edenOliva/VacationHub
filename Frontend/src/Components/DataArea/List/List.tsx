import { useEffect, useState } from "react";
import "./List.css";
import VacationModel from "../../../Models/VacationModel";
import Spinner from "../../LayoutArea/Spinner/Spinner";
import Card from "../Card/Card";
import VacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import Pagination from "../../LayoutArea/Pagination/Pagination";
import { authStore } from "../../../Redux/AuthState";

function List(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const user = authStore.getState().user;
    const navigate = useNavigate();

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentVacations = vacations.slice(indexOfFirstItem, indexOfLastItem);
    
    useEffect(() => {
        if (user) {                
            fetchVacations();
        }
        else {
            notifyService.error('please login');
            navigate('/login')
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

    return (
        <div className="List">

            {vacations.length === 0 && <Spinner />}

            {currentVacations.map(c => <Card key={c.vacationId} vacation={c} />)}

            <div className="PaginationContainer">
                <Pagination totalPosts={vacations.length} postsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>
    );
}

export default List;

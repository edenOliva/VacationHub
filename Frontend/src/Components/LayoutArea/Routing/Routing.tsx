import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../../AuthArea/Register/Register";
import Insert from "../../DataArea/Insert/Insert";
import List from "../../DataArea/List/List";
import Home from "../../HomeArea/Home/Home";
import Menu from "../Menu/Menu";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Edit from "../../DataArea/Edit/Edit";
import LikedVacations from "../../DataArea/VacationsFilters/LikedVacations/LikedVacations";
import VacationsToCome from "../../DataArea/VacationsFilters/VacationsToCome/VacationsToCome";
import ActiveVacations from "../../DataArea/VacationsFilters/ActiveVacations/ActiveVacations";
import FollowersChart from "../../DataArea/AdminButtons/FollowersChart/FollowersChart";

function Routing(): JSX.Element {

    const token = localStorage.getItem('token');
    
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Menu />}>
                <Route path="/home" element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/insert" element={<Insert />} />
                <Route path="/liked-vacations" element={<LikedVacations />} />
                <Route path="/vacations-to-come" element={<VacationsToCome />} />
                <Route path="/active-vacations" element={<ActiveVacations />} />
                <Route path="/vacations/edit/:vacationId" element={<Edit />} />
                <Route path="/vacations/followers-chart" element={<FollowersChart />} />
            </Route>

            {token && <Route path="/" element={<Navigate to="/home" />} />}
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;

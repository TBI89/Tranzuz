import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import MissionList from "../../MissionArea/MIssionList/MissionList";
import MissionDetails from "../../MissionArea/MissionDetails/MissionDetails";
import PieChart from "../../ReportsArea/PieChart/PieChart";
import BarChart from "../../ReportsArea/BarChart/BarChart";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/missions" element={<MissionList />} />
            <Route path="/missions/:_id" element={<MissionDetails />} />
            <Route path="/single-month-report" element={<PieChart />} />
            <Route path="/multi-month-report" element={<BarChart />} />
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;

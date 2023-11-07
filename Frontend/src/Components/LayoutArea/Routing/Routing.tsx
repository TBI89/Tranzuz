import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import MissionList from "../../MissionArea/MIssionList/MissionList";
import MissionDetails from "../../MissionArea/MissionDetails/MissionDetails";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/missions" element={<MissionList />} />
            <Route path="/missions/:_id" element={<MissionDetails />} />
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;

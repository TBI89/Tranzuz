import { useEffect, useState } from "react";
import "./MissionDetails.css";
import MissionModel from "../../../Models/MissionModel";
import missionsService from "../../../Services/MissionsService";
import { useNavigate, useParams } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import useTitle from "../../../Utils/UseTitle";
import InfoIcon from '@mui/icons-material/Info';
import { NavLink } from "react-router-dom";

function MissionDetails(): JSX.Element {

    // Tab title:
    useTitle("Tranzuz | Details");

    // Init the mission's _id to use on the when fetching the data:
    const params = useParams();
    const _id = params._id;

    // Mission local state:
    const [mission, setFnMission] = useState<MissionModel>();

    // Apply if the user tries to go manually to the route without logging in:
    const navigate = useNavigate();

    // Go the backend and fetch the mission:
    useEffect(() => {

        missionsService.getSingleMissionById(_id)
            .then(mission => setFnMission(mission))
            .catch(err => {
                notifyService.error(err)
                if (err.response.status === 401) {
                    navigate("/login");
                }
            });
    }, []);

    return (
        <div className="MissionDetails">
            <NavLink className="NavLinkToMissions" to={"/missions"}>חזרה ליומן</NavLink>
            <h2><InfoIcon /> פרטי קו</h2>
            <h3>מזהה קו: {mission?.lineData.lineId}</h3>
            <h3>מספר קו: {mission?.lineData.lineNumber}</h3>
            <h3>כיוון: {mission?.lineData.direction}</h3>
            <h3>חלופה: {mission?.lineData.alternative}</h3>
            <h3>מוצא: {mission?.stops.startingPoint}</h3>
            <h3>יעד: {mission?.stops.destination}</h3>
            <h3>תיאור: {mission?.lineData.description}</h3>
            <h3>מזהה נסיעה: {mission?.tripId}</h3>
            <h3>זמן יציאה: {mission?.departureTime}</h3>
            <h3>זמן יציאה אפקטיבי: {mission?.effectiveDepartureTime}</h3>
            <h3>יום בשבוע: {mission?.dayOfTheWeek}</h3>
            <h3>מתאריך: {mission?.startingDate}</h3>
            <h3>עד תאריך: {mission?.endingDate}</h3>
            <h3>מקור: {mission?.sourceId}</h3>
            <h3>סוג: {mission?.missionType}</h3>
            <h3>קו מושפע: {mission?.affectedMission}</h3>
            <h3>כיוון קו מושפע: {mission?.affectedMissionDirection}</h3>
            <h3>חלופת קו מושפע: {mission?.affectedMissionAlternative}</h3>
            <h3>תיאור קו מושפע: {mission?.affectedMissionDescription}</h3>
        </div>
    );
}

export default MissionDetails;

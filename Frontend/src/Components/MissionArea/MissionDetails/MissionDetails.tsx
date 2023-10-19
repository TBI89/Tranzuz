import { useEffect, useState } from "react";
import "./MissionDetails.css";
import MissionModel from "../../../Models/MissionModel";
import missionsService from "../../../Services/MissionsService";
import { useNavigate, useParams } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";

function MissionDetails(): JSX.Element {

    // Init the mission's _id to use on the when fetching the data:
    const params = useParams();
    const _id = params._id;
    console.log(_id);
    

    // Mission local state:
    const [mission, setFnMission] = useState<MissionModel>();  

    // Apply if the user tries to go manually to the route without logging in:
    const navigate = useNavigate();

    // Go the backend and fetch the mission:
    useEffect(() => { 
        console.log(mission);
        
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
            <h3>{mission?.lineData.lineId}</h3>
            <h3>{mission?.lineData.lineNumber}</h3>
            <h3>{mission?.lineData.direction}</h3>
            <h3>{mission?.lineData.alternative}</h3>
            <h3>{mission?.stops.startingPoint}</h3>
            <h3>{mission?.stops.destination}</h3>
            <h3>{mission?.lineData.description}</h3>
            <h3>{mission?.tripId}</h3>
            <h3>{mission?.departureTime}</h3>
            <h3>{mission?.effectiveDepartureTime}</h3>
            <h3>{mission?.dayOfTheWeek}</h3>
            <h3>{mission?.startingDate}</h3>
            <h3>{mission?.endingDate}</h3>
            <h3>{mission?.sourceId}</h3>
            <h3>{mission?.missionType}</h3>
            <h3>{mission?.affectedMission}</h3>
            <h3>{mission?.affectedMissionDirection}</h3>
            <h3>{mission?.affectedMissionAlternative}</h3>
            <h3>{mission?.affectedMissionDescription}</h3>
        </div>
    );
}

export default MissionDetails;

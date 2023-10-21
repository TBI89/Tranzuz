import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MissionModel from "../../../Models/MissionModel";
import missionsService from "../../../Services/MissionsService";
import notifyService from "../../../Services/NotifyService";
import useTitle from "../../../Utils/UseTitle";
import "./MissionList.css";

function MissionList(): JSX.Element {

    // Tab title:
    useTitle("Tranzuz | Missions");

    const [missions, setMissions] = useState<MissionModel[]>([]); // Manege missions local state.
    const navigate = useNavigate(); // use to redirect the user when needed.

    // Fetch all the missions from the backend (once, when the component mounts:)
    useEffect(() => {
        missionsService.getAllMissions()
            .then(missions => setMissions(missions))
            .catch(err => {
                notifyService.error(err);
                if (err.response?.status === 401) navigate("/login"); // Navigate to login page if the user didn't identified.
            });
    }, []);

    return (
        <div className="MissionList">

            <table>

                <thead>
                    <tr>
                        <th>מזהה קו</th>
                        <th>מספר קו</th>
                        <th>כיוון</th>
                        <th>חלופה</th>
                        <th>מוצא</th>
                        <th>יעד</th>
                        <th>תיאור</th>
                        <th>מזהה נסיעה</th>
                        <th>זמן יציאה</th>
                        <th>זמן יציאה אפקטיבי</th>
                        <th>יום בשבוע</th>
                        <th>מתאריך</th>
                        <th>עד תאריך</th>
                        <th>מקור</th>
                        <th>סוג</th>
                        <th>קו מושפע </th>
                        <th>כיוון קו מושפע</th>
                        <th>חלופת קו מושפע</th>
                        <th>תיאור קו מושפע</th>
                        <th>אפשרויות</th>
                    </tr>
                </thead>

                <tbody>
                    {missions.map(m =>
                        <tr key={m._id}>
                            <td>{m.lineData.lineId}</td>
                            <td>{m.lineData.lineNumber}</td>
                            <td>{m.lineData.direction}</td>
                            <td>{m.lineData.alternative}</td>
                            <td>{m.stops.startingPoint}</td>
                            <td>{m.stops.destination}</td>
                            <td>{m.lineData.description}</td>
                            <td>{m.tripId}</td>
                            <td>{m.departureTime}</td>
                            <td>{m.effectiveDepartureTime}</td>
                            <td>{m.dayOfTheWeek}</td>
                            <td>{m.startingDate}</td>
                            <td>{m.endingDate}</td>
                            <td>{m.sourceId}</td>
                            <td>{m.missionType}</td>
                            <td>{m.affectedMission}</td>
                            <td>{m.affectedMissionDescription}</td>
                            <td>{m.affectedMissionAlternative}</td>
                            <td>{m.affectedMissionDescription}</td>
                            <td>{<NavLink to={`/missions/${m._id}`}>🔎</NavLink>}</td>
                        </tr>
                    )}
                </tbody>

            </table>

        </div>
    );
}

export default MissionList;

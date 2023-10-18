import { useEffect, useState } from "react";
import "./MissionList.css";
import MissionModel from "../../../Models/MissionModel";
import { useNavigate } from "react-router-dom";
import missionsService from "../../../Services/MissionsService";
import notifyService from "../../../Services/NotifyService";

function MissionList(): JSX.Element {

    const [missions, setMissions] = useState<MissionModel[]>([]); // Manege missions local state.
    const navigate = useNavigate(); // use to redirect the user when needed.

    useEffect(() => {
        missionsService.getAllMissions()
            .then(missions => setMissions(missions))
            .catch(err => {
                notifyService.error(err);
                if (err.response?.status === 401) navigate("/login");
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
                    </tr>
                </thead>

                <tbody>
                    {missions.map(m =>
                        <tr>
                            <td></td>
                        </tr>
                    )}
                </tbody>

            </table>

        </div>
    );
}

export default MissionList;

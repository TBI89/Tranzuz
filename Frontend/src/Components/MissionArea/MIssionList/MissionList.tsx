import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import MissionModel from "../../../Models/MissionModel";
import missionsService from "../../../Services/MissionsService";
import notifyService from "../../../Services/NotifyService";
import useTitle from "../../../Utils/UseTitle";
import "./MissionList.css";
import { MissionActionObject, MissionActionType, missionStore } from "../../../Redux/MissionState";

function MissionList(): JSX.Element {

    // Tab title:
    useTitle("Tranzuz | Missions");

    const [missions, setMissions] = useState<MissionModel[]>([]);
    const [editMissionId, setEditMissionId] = useState<string>(null); // Enable editing fields.
    const [editedValues, setEditedValues] = useState<Record<string, string>>({
        departureTime: ""
    });

    const navigate = useNavigate(); // use to redirect the user when needed.

    // Fetch all the missions from the backend (once, when the component mounts:)
    useEffect(() => {
        missionsService.getAllMissions()
            .then(missions => setMissions(missions))
            .catch(err => {
                notifyService.error(err);
                if (err.response?.status === 401) navigate("/login"); // Navigate to login page if the user didn't identified.
            });
    }, [navigate]);

    // Fetch the _id of the mission when user clicks the related column:
    function handleEditing(missionId: string) {
        if (editMissionId === missionId) {
            // Save changes and exit edit mode.
            handleSaving();
            setEditMissionId(null);
        } else {
            // Enter edit mode for the selected mission.
            const missionToEdit = missions.find(m => m._id === missionId);
            if (missionToEdit) {
                setEditMissionId(missionId);
                setEditedValues({ departureTime: missionToEdit.departureTime });
            }
        }
    }

    // Save changes & update the column:
    async function handleSaving() {
        try {
            if (editMissionId) {
                const missionToEdit = missions.find(m => m._id === editMissionId);
                if (missionToEdit) {
                    const editedMission: MissionModel = {
                        ...missionToEdit,
                        departureTime: editedValues.departureTime
                    };
                    // Send PATCH request to the server to update the mission:
                    await missionsService.updateMissionById(editMissionId, "departureTime", editedValues.departureTime);
                    // Update local state:
                    setMissions(prevMissions =>
                        prevMissions.map(m => (m._id === editMissionId ? editedMission : m))
                    );
                    notifyService.success("המשימה עודכנה בהצלחה");
                }
            }
        } catch (err: any) {
            notifyService.error("תקלה בזמן העדכון. יש לנסות שוב מאוחר יותר.");
            console.log(err);
        } finally {
            // Reset editing filed state.
            setEditMissionId(null);
            setEditedValues({ departureTime: "" });
        }
    }

    // Remove column:
    async function deleteMission(_id: string): Promise<void> {
        try {
            const sure = window.confirm("האם להסיר את הרשומה?");
            if (!sure) return;
            await missionsService.deleteMission(_id);
            setMissions(prevMissions => prevMissions.filter(pm => pm._id !== _id));
            notifyService.success("הרשומה הוסרה בהצלחה!");
        }
        catch (err: any) {
            notifyService.error("תקלה בביצוע המחיקה. יש לנסות שוב מאוחר יותר.");
            console.log(err);
        }
    }

    // Duplicate column:
    async function duplicateMission(_id: string): Promise<void> {
        try {
            const sure = window.confirm("האם לשכפל את הרשומה?");
            if (!sure) return;
            const duplicatedMission = await missionsService.duplicateMission(_id);
            const action: MissionActionObject = { type: MissionActionType.DuplicateMission, payload: duplicatedMission };
            missionStore.dispatch(action);
            notifyService.success("הרשומה שוכפלה בהצלחה!");
            setMissions(prevMissions => [...prevMissions, duplicatedMission]);
        }
        catch (err: any) {
            notifyService.error("תקלה בביצוע השכפול. יש לנסות שוב מאוחר יותר.");
            console.log(err);
        }
    }

    return (
        <div className="MissionList">

            <table>

                <thead>
                    <tr>
                        <th>פרטים</th>
                        <th>מחיקה</th>
                        <th>שכפול</th>
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
                        <tr key={m._id}>
                            <td>{<NavLink to={`/missions/${m._id}`}>🔎</NavLink>}</td>
                            <td>{<button onClick={() => deleteMission(m._id)}>❌</button>}</td>
                            <td>{<button onClick={() => duplicateMission(m._id)}>➕</button>}</td>
                            <td>{m.lineData.lineId}</td>
                            <td>{m.lineData.lineNumber}</td>
                            <td>{m.lineData.direction}</td>
                            <td>{m.lineData.alternative}</td>
                            <td>{m.stops.startingPoint}</td>
                            <td>{m.stops.destination}</td>
                            <td>{m.lineData.description}</td>
                            <td>{m.tripId}</td>
                            <td
                                onDoubleClick={() => handleEditing(m._id)}
                                style={{ cursor: "pointer", padding: "5px" }}
                            >
                                {editMissionId === m._id ? (
                                    // If in edit mode, show an input field and Save button.
                                    <>
                                        <input
                                            type="text"
                                            value={editedValues.departureTime}
                                            onChange={e =>
                                                setEditedValues({
                                                    departureTime: e.target.value
                                                })
                                            }
                                        />
                                        <button onClick={handleSaving}>Save</button>
                                    </>
                                ) : (
                                    // If not in edit mode, display the departureTime value.
                                    m.departureTime
                                )}
                            </td>
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
                        </tr>
                    )}
                </tbody>

            </table>

        </div>
    );
}

export default MissionList;

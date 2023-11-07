import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { NavLink, useNavigate } from "react-router-dom";
import MissionModel from "../../../Models/MissionModel";
import { MissionActionObject, MissionActionType, missionStore } from "../../../Redux/MissionState";
import missionsService from "../../../Services/MissionsService";
import notifyService from "../../../Services/NotifyService";
import useTitle from "../../../Utils/UseTitle";
import "./MissionList.css";

function MissionList(): JSX.Element {

    // Tab title:
    useTitle("Tranzuz | Missions");

    const [missions, setMissions] = useState<MissionModel[]>([]);
    const [editMissionId, setEditMissionId] = useState<string>(null); // Enable editing fields.
    const [editedValues, setEditedValues] = useState<Record<string, string>>({
        departureTime: ""
    });
    const [isOptionsClicked, setIsOptionsClicked] = useState<string>(null);

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

    // When the user clicks the "אפשרויות" button, the "optionsMenuContainer" items will be displayed:
    function handleOptionClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, mission_id: string) {
        event.stopPropagation(); // Prevent the event from reaching parent elements if necessary
        setIsOptionsClicked(prevState => (prevState === mission_id ? null : mission_id));
    }

    return (

        <div className="MissionList">

            <table>

                <thead>
                    <tr>
                        <th>אפשרויות</th>
                        <th>מזהה קו</th>
                        <th>מספר קו</th>
                        <th>כיוון</th>
                        <th>חלופה</th>
                        <th>מוצא</th>
                        <th>יעד</th>
                        <th>תיאור</th>
                        <th>מזהה נסיעה</th>
                        <th>זמן יציאה<EditIcon /></th>
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
                            <td>
                                <button onClick={(e) => handleOptionClick(e, m._id)}><MoreHorizIcon /></button>
                                <div className={`OptionsMenuContainer ${isOptionsClicked === m._id ? 'visible' : ''}`}>
                                    <span>{<NavLink to={`/missions/${m._id}`}><InfoIcon /></NavLink>}</span>
                                    <br />
                                    <span>{<button onClick={() => deleteMission(m._id)}><DeleteIcon /></button>}</span>
                                    <br />
                                    <span>{<button onClick={() => duplicateMission(m._id)}><ControlPointDuplicateIcon /></button>}</span>
                                </div>
                            </td>
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
                                        <input className='EditInputBox'
                                            type="text"
                                            value={editedValues.departureTime}
                                            onChange={e =>
                                                setEditedValues({
                                                    departureTime: e.target.value
                                                })
                                            }
                                        />
                                        <button className="btn btn-success" onClick={handleSaving}>שמירה</button>
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

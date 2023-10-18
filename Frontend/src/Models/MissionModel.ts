import LineModel from "./LineModel";
import LocationModel from "./LocationModel";
import SourceModel from "./SourceModel";
import TripModel from "./TripModel";

class MissionModel {

    // Model:
    public _id: number;
    public lineData: {
        lineId: number;
        lineNumber: number;
        direction: number;
        alternative: string;
        description: string;
    }
    public stops: {
        startingPoint: string;
        destination: string;
    }
    public tripId: number;
    public departureTime: string;
    public effectiveDepartureTime: string;
    public dayOfTheWeek: number;
    public startingDate: string;
    public endingDate: string;
    public sourceId: string;
    public missionType: string;
    public affectedMission: number;
    public affectedMissionDirection: number;
    public affectedMissionAlternative: string;
    public affectedMissionDescription: string;

    // Custom validation:
    public static departureValidation = {
        required: { value: true, message: "יש להזין שעת יציאה." }
    }
    public static effectiveDepartureValidation = {
        required: { value: true, message: "יש להזין שעת יציאה אפקטיבית." }
    }
    public static dayOfTheWeekValidation = {
        required: { value: true, message: "יש לבחור יום." }
    }
    public static startingDateValidation = {
        required: { value: true, message: "יש לבחור תאריך התחלה." }
    }
    public static endingDateValidation = {
        required: { value: true, message: "יש לבחור תאריך סיום." }
    }
    public static missionTypeValidation = {
        required: { value: true, message: "יש לבחור סוג." }
    }
}

export default MissionModel;
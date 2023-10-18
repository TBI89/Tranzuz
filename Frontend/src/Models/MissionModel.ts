import LineModel from "./LineModel";
import LocationModel from "./LocationModel";
import SourceModel from "./SourceModel";
import TripModel from "./TripModel";

class MissionModel {

    // Model:
    public lineData: {
        lineId: LineModel;
        lineNumber: LineModel;
        direction: LineModel;
        alternative: LineModel;
        description: LineModel;
    }
    public stops: {
        startingPoint: LocationModel;
        destination: LocationModel;
    }
    public tripId: TripModel;
    public departureTime: string;
    public effectiveDepartureTime: string;
    public dayOfTheWeek: number;
    public startingDate: Date;
    public endingDate: string;
    public sourceId: SourceModel;
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
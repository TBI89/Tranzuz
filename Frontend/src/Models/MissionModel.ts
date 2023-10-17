class MissionModel {

    // Model:
    public missionNumber: number;
    public direction: number;
    public alternative: string;
    public stops: {
        startingPoint: string;
        destination: string;
    }
    public description: string;
    public tripId: number;
    public departureTime: string;
    public effectiveDepartureTime: string;
    public dayOfTheWeek: number;
    public startingDate: Date;
    public endingDate: string;
    public sourceId: string;
    public missionType: string;
    public affectedMission: number;
    public affectedMissionDirection: number;
    public affectedMissionAlternative: string;
    public affectedMissionDescription: string;

    // Custom validation:
    public static missionNumberValidation = {
        required: { value: true, message: "יש להזין את מספר הקו." }
    }
    public static directionValidation = {
        required: { value: true, message: "יש להזין כיוון." }
    } 

    // ADD THE STOPS VALIDATION!

    public static descriptionValidation = {
        required: { value: true, message: "יש להזין תיאור." }
    }
    public static tripIdValidation = {
        required: { value: true, message: "יש לבחור מס' נסיעה." }
    }
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
    public static sourceIdDateValidation = {
        required: { value: true, message: "יש לבחור את שם המקור." }
    }
    public static missionTypeValidation = {
        required: { value: true, message: "יש לבחור סוג." }
    }

}

export default MissionModel;
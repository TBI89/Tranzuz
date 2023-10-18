class LineModel {

    // Model:
    public lineId: number;
    public lineNumber: number;
    public direction: number;
    public alternative: string;
    public description: string;

    // Custom validation:
    public static lineIdValidation = {
        required: {value: true, message: "יש להזין מזהה קו."}
    }
    public static lineNumberValidation = {
        required: {value: true, message: "יש להזין מספר קו."}
    }
    public static directionValidation = {
        required: {value: true, message: "יש להזין את כיוון הקו."}
    }

}

export default LineModel;
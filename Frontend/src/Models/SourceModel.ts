class SourceModel {

    // Model:
    public sourceName: string;

    // Custom validation:
    public static sourceNameValidation = {
        required: {value: true, message: "יש להזין את שם המקור."}
    }
}

export default SourceModel;
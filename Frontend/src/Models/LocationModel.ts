class LocationModel {

    // Model:
    public locationName: string;

    // Custom validation:
    public static locationNameValidation = {
        required: {value: true, message: "יש להזין את שם המיקום."}
    }
}

export default LocationModel;
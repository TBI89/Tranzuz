class TripModel {

    // Model:
    public tripId: number;

    // Custom validation:
    public static tripIdValidation = {
        required: {value: true, message: "יש לבחור קוד נסיעה."}
    }
}

export default TripModel;
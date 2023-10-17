class CredentialsModel {

    // Model:
    public email: string;
    public password: string;

    // Custom validation:
    public static emailValidation = {
        required: {value: true, message: "יש להזין את כתובת המייל."},
    }
    public static passwordValidation = {
        required: {value: true, message: "יש להזין סיסמא."},
    }

}

export default CredentialsModel;
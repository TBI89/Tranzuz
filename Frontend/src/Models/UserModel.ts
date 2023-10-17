class UserModel {

    // Model:
    public firstName: string;
    public lastName: string;
    public password: string;
    public email: string;

    // Custom validation:
    public static firstNameValidation = {
        required: {value: true, message: ".יש להזין שם פרטי"},
        minLength: {value: 2, message: "שם פרטי חייב להכיל לפחות 2 תווים."},
        maxLength: {value: 30, message: "שם פרטי יכול להכיל 30 תווים לכל היותר."}
    }
    public static lastNameValidation = {
        required: {value: true, message: ".יש להזין שם משפחה"},
        minLength: {value: 2, message: "שם משפחה חייב להכיל לפחות 2 תווים."},
        maxLength: {value: 30, message: "שם משפחה יכול להכיל 30 תווים לכל היותר."}
    }
    public static passwordValidation = {
        required: {value: true, message: ".יש להזין סיסמא"},
        minLength: {value: 8, message: "סיסמא חייבת להכיל לפחות 8 תווים."}
    }
    public static emailValidation = {
        required: {value: true, message: "יש להזין את כתובת המייל."}
    }

}

export default UserModel;
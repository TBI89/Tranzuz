import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";

function Register(): JSX.Element {

    // Form state:
    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate(); // We use it when the user submits the form.

    // Send new user to backend & notify and redirect to the missions page:
    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("ההרשמה בוצעה בהצלחה!");
            navigate("/missions");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(send)}>

                <label>שם פרטי</label>
                <input type="text" {...register("firstName", UserModel.firstNameValidation)} />
                <span className="Error">{formState.errors.firstName?.message}</span>
                <br /><br />

                <label>שם משפחה</label>
                <input type="text" {...register("lastName", UserModel.lastNameValidation)} />
                <span className="Error">{formState.errors.lastName?.message}</span>
                <br /><br />

                <label>דוא"ל</label>
                <input type="email" {...register("email", UserModel.emailValidation)} />
                <span className="Error">{formState.errors.email?.message}</span>
                <br /><br />

                <label>סיסמא</label>
                <input type="password" {...register("password", UserModel.passwordValidation)} />
                <span className="Error">{formState.errors.password?.message}</span>
                <br /><br />

                <button className="ButtonRegister">הרשמה</button>
                
            </form>

        </div>
    );
}

export default Register;

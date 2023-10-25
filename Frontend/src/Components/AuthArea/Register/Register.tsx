import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import useTitle from "../../../Utils/UseTitle";

function Register(): JSX.Element {

    useTitle("Tranzuz | Register");

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

                <input type="text" className="form-control" placeholder="שם פרטי" {...register("firstName", UserModel.firstNameValidation)} />
                <span className="Error">{formState.errors.firstName?.message}</span>
                <br /><br />

                <input type="text" className="form-control" placeholder="שם משפחה" {...register("lastName", UserModel.lastNameValidation)} />
                <span className="Error">{formState.errors.lastName?.message}</span>
                <br /><br />

                <input type="email" className="form-control" placeholder="מייל" {...register("email", UserModel.emailValidation)} />
                <span className="Error">{formState.errors.email?.message}</span>
                <br /><br />

                <input type="password" className="form-control" placeholder="סיסמא" {...register("password", UserModel.passwordValidation)} />
                <span className="Error">{formState.errors.password?.message}</span>
                <br /><br />

                <button className="btn btn-primary">הרשמה</button>
                
            </form>

        </div>
    );
}

export default Register;

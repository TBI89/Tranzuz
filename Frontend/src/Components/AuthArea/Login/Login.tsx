import { useForm } from "react-hook-form";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import CredentialsModel from "../../../Models/CredentialsModel";
import useTitle from "../../../Utils/UseTitle";

function Login(): JSX.Element {

    useTitle("Tranzuz | Login");

    // Form state:
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate(); // We use it when the user submits the form.

    // Send new user to backend & notify and redirect to the missions page:
    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("הכניסה בוצעה בהצלחה!");
            navigate("/missions");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>

                <input type="email" className="form-control" placeholder="מייל" {...register("email", CredentialsModel.emailValidation)} />
                <span className="Error">{formState.errors.email?.message}</span>
                <br /><br />

                <input type="password" className="form-control" placeholder="סיסמא" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Error">{formState.errors.password?.message}</span>
                <br /><br />

                <button className="btn btn-primary">כניסה</button>

            </form>

        </div>
    );
}

export default Login;

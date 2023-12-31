import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import useTitle from "../../../Utils/UseTitle";
import registerPageImage from "../../../Assets/Images/register-form-image.jpg";
import logoImage from "../../../Assets/Images/home-page-logo.webp";
import { useEffect } from "react";
import { authStore } from "../../../Redux/AuthState";

function Register(): JSX.Element {

    // Tab title:
    useTitle("Tranzuz | Register");

    // Form state:
    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate(); // We use it when the user submits the form.

    // if the user is logged in, don't allow access to the register page:
    useEffect(() => {
        const loggedInUser = authStore.getState().token;
        if (loggedInUser) {
            navigate("/missions");
            return;
        }
    }, []);

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

    // Navigate to Login page when the user clicks on "התחברות" button:
    function navigateToLogin() {
        navigate("/login");
    }

    return (
        <div className="Register">

            <div className="ImageContainer">
                <img src={registerPageImage} />
            </div>

            <div >
                <img className="LogoImage" src={logoImage} />
            </div>

            <div className="FormContainer">

                <form onSubmit={handleSubmit(send)}>

                    <h2>ברוכים הבאים ל-Tranzuz</h2>
                    <h3>הרשמו עכשיו!</h3>

                    <input type="text" className="form-control" placeholder="שם פרטי" {...register("firstName", UserModel.firstNameValidation)} />
                    <span className="Error">{formState.errors.firstName?.message}</span>
                    <br />

                    <input type="text" className="form-control" placeholder="שם משפחה" {...register("lastName", UserModel.lastNameValidation)} />
                    <span className="Error">{formState.errors.lastName?.message}</span>
                    <br />

                    <input type="email" className="form-control" placeholder="מייל" {...register("email", UserModel.emailValidation)} />
                    <span className="Error">{formState.errors.email?.message}</span>
                    <br />

                    <input type="password" className="form-control" placeholder="סיסמא" {...register("password", UserModel.passwordValidation)} />
                    <span className="Error">{formState.errors.password?.message}</span>
                    <br />

                    <div className="ButtonContainer">
                        <button className="btn btn-primary">הרשמה</button>
                        <button onClick={navigateToLogin} className="btn btn-outline-primary">התחברות</button>
                    </div>

                </form>

            </div>

        </div>
    );
}

export default Register;

import { useForm } from "react-hook-form";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import CredentialsModel from "../../../Models/CredentialsModel";
import useTitle from "../../../Utils/UseTitle";
import loginPageImage from "../../../Assets/Images/register-form-image.jpg";
import logoImage from "../../../Assets/Images/home-page-logo.webp";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";

function Login(): JSX.Element {

    useTitle("Tranzuz | Login");

    const { register, handleSubmit, formState } = useForm<CredentialsModel>(); // Form state.
    const navigate = useNavigate(); // We use it when the user submits the form.

    // If the user is logged in don't allow access to the login page:
    useEffect(() => {
        const loggedInUser = authStore.getState().token;
        if (loggedInUser) {
            navigate("/missions");
            return;
        }
    }, []);

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

    // Navigate to Register component when the user clicks the "יצירת חשבון" button:
    function navigateToRegister() {
        navigate("/register");
    }

    return (
        <div className="Login">

            <div className="ImageContainer">
                <img src={loginPageImage} />
            </div>

            <div>
                <img className="LogoImage" src={logoImage} />
            </div>

            <div className="FormContainer">
                <form onSubmit={handleSubmit(send)}>

                    <h2>ברוכים השבים ל-Tranzuz</h2>
                    <h4>טוב לראות אותך שוב!</h4>
                    <br />

                    <input type="email" className="form-control" placeholder="מייל" {...register("email", CredentialsModel.emailValidation)} />
                    <span className="Error">{formState.errors.email?.message}</span>
                    <br />

                    <input type="password" className="form-control" placeholder="סיסמא" {...register("password", CredentialsModel.passwordValidation)} />
                    <span className="Error">{formState.errors.password?.message}</span>
                    <br />

                    <div className="ButtonContainer">
                        <button className="btn btn-primary">כניסה</button>
                        <button onClick={navigateToRegister} className="btn btn-outline-primary">יצירת חשבון</button>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default Login;

import axios from "axios";
import { authStore } from "../Redux/AuthState";

class Interceptors {

    public create(): void {

        // Register to request interceptor:
        axios.interceptors.request.use(requestObj => { // Use a request object.
            if(authStore.getState().token) { // Check if the request has a token.
                // If it does, add it to the request.
                requestObj.headers.Authorization = "Bearer " + authStore.getState().token;
            }
            return requestObj;
        });
    }
}

const interceptors = new Interceptors(); // Singleton.
export default interceptors;
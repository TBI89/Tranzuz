import axios from "axios";
import MissionModel from "../Models/MissionModel";
import appConfig from "../Utils/AppConfig";

class MissionsService {

    // Go to the backend (GET request) extract and return all missions:
    public async getAllMissions(): Promise<MissionModel[]> {
        const response = await axios.get<MissionModel[]>(appConfig.missionsUrl);
        const missions = response.data;
        return missions;
    }
}

const missionsService = new MissionsService(); // Singleton.
export default missionsService;
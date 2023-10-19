import axios from "axios";
import MissionModel from "../Models/MissionModel";
import appConfig from "../Utils/AppConfig";
import { missionStore } from "../Redux/MissionState";

class MissionsService {

    // Go to the backend (GET request) extract and return all missions:
    public async getAllMissions(): Promise<MissionModel[]> {
        const response = await axios.get<MissionModel[]>(appConfig.missionsUrl);
        const missions = response.data;
        return missions;
    }

    // Go to the backend, get missions state, find the _id and return it:
    public async getSingleMissionById(_id: string): Promise<MissionModel> {
        let missions = missionStore.getState().missions;
        let mission = missions.find(m => m._id === _id);
        if (!mission) {
            const response = await axios.get<MissionModel>(appConfig.missionsUrl + _id);
            mission = response.data;
        }
        console.log(mission);
        return mission;
    }
}

const missionsService = new MissionsService(); // Singleton.
export default missionsService;
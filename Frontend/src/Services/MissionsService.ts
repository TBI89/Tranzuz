import axios from "axios";
import MissionModel from "../Models/MissionModel";
import appConfig from "../Utils/AppConfig";
import { MissionActionObject, MissionActionType, missionStore } from "../Redux/MissionState";

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
        return mission;
    }

    // Go to the backend, add mission _id to request, extract the updated obj & update global state:
    public async updateMissionById(mission: MissionModel): Promise<void> {
        const response = await axios.patch<MissionModel>(appConfig.missionsUrl + mission._id, mission);
        const updatedMission = response.data;
        const action: MissionActionObject = { type: MissionActionType.UpdateMission, payload: updatedMission };
        missionStore.dispatch(action);
    }

    // Delete mission by _id:
    public async deleteMission(_id: string): Promise<void> {
        await axios.delete(appConfig.missionsUrl + _id);
        const action: MissionActionObject = { type: MissionActionType.DeleteMission, payload: _id };
        missionStore.dispatch(action);
    }

    // Duplicate mission by _id:
    public async duplicateMission(_id: string): Promise<void> {
        const response = await axios.post(appConfig.missionsUrl + _id);
        const duplicatedMission = response.data;
        const action: MissionActionObject = { type: MissionActionType.DuplicateMission, payload: duplicatedMission };
        missionStore.dispatch(action);
    }

}

const missionsService = new MissionsService(); // Singleton.
export default missionsService;
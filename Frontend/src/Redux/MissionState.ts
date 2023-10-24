import { createStore } from "redux";
import MissionModel from "../Models/MissionModel";

// 1. Global state:
export class MissionState {
    public missions: MissionModel[] = [];
}

// 2. Action types:
export enum MissionActionType {
    SetMission = "SetMission",
    DuplicateMission = "DuplicateMission",
    UpdateMission = "UpdateMission",
    DeleteMission = "DeleteMission"
}

// 3. Action object:
export interface MissionActionObject {
    type: MissionActionType;
    payload?: any;
}

// 4. Reducer:
export function missionReducer(currentState = new MissionState(), action: MissionActionObject): MissionState {

    // Create the new state based on the current one:
    const newState = { ...currentState };

    // Modify state according to action:
    switch (action.type) {
        case MissionActionType.SetMission:
            newState.missions = action.payload;
            break;
        case MissionActionType.DuplicateMission:
            newState.missions.push(action.payload);
            break;
        case MissionActionType.UpdateMission:
            const indexToUpdate = newState.missions.findIndex(m => m._id === action.payload._id);
            if (indexToUpdate >= 0) newState.missions[indexToUpdate] = action.payload;
            break;
        case MissionActionType.DeleteMission:
            const indexToDelete = newState.missions.findIndex(m => m._id === action.payload);
            if (indexToDelete >= 0) newState.missions.splice(indexToDelete, 1);
            break;
    }
    return newState;
}

// 5. Store:
export const missionStore = createStore(missionReducer);
import { createStore } from "redux";
import MissionModel from "../Models/MissionModel";

// 1. Global state:
export class MissionState {
    public missions: MissionModel[] = [];
}

// 2. Action types:
export enum MissionActionType {
    SetMission = "SetMission"
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
    }
    return newState;
}

// 5. Store:
export const missionStore = createStore(missionReducer);
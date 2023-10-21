import express, { Request, Response, NextFunction } from "express";
import missionService from "../5-services/mission-service";
import verifyToken from "../4-middleware/verify-token";
import { ValidationError } from "../3-models/client-errors";

const router = express.Router();

// GET http://localhost:4000/api/missions
router.get("/missions", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const missions = await missionService.getAllMissions();
        response.json(missions);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/missions/:_id
router.get("/missions/:_id", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const mission = await missionService.getSingleMissionById(_id);
        response.json(mission);
    }
    catch (err: any) {
        next(err);
    }
});

// PATCH http://localhost:4000/api/missions/:_id
router.patch("/missions/:_id", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const { propName, propValue } = request.body;
        console.log("Mission ID: ", _id);
        console.log("Property to update: ", propName);
        console.log("Property new value: ", propValue);
        console.log("request.body: ",request.body);
        
        if (!propName) throw new ValidationError("יש לעדכן את השדה הנבחר.");
        const updatedMission = await missionService.updateMissionById(_id, propName, propValue);
        response.json(updatedMission);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

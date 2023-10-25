import express, { Request, Response, NextFunction } from "express";
import missionService from "../5-services/mission-service";
import verifyToken from "../4-middleware/verify-token";
import { ValidationError } from "../3-models/client-errors";
import StatusCode from "../3-models/status-code";
import { MissionModel } from "../3-models/mission-model";

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
        if (!propName) throw new ValidationError("יש לעדכן את השדה הנבחר.");
        const updatedMission = await missionService.updateMissionById(_id, propName, propValue);
        response.json(updatedMission);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:4000/api/missions/:_id
router.delete("/missions/:_id", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await missionService.deleteMission(_id);
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/missions/:_id
router.post("/missions/:_id", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
       const existingMission = request.params._id;
       const duplicatedMission = await missionService.duplicateMission(existingMission);
       response.status(StatusCode.Created).json(duplicatedMission);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

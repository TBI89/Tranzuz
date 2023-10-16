import express, { Request, Response, NextFunction } from "express";
import missionService from "../5-services/mission-service";

const router = express.Router();

// GET http://localhost:4000/api/missions
router.get("/missions", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const missions = await missionService.getAllMissions();
        response.json(missions);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;

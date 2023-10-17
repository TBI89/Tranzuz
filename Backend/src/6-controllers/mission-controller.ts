import express, { Request, Response, NextFunction } from "express";
import missionService from "../5-services/mission-service";
import verifyToken from "../4-middleware/verify-token";

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

export default router;

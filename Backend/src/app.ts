require("dotenv").config(); // Load .env file to process .env
import express from "express";
import cors from "cors";
import missionController from "./6-controllers/mission-controller";
import authController from "./6-controllers/auth-controller";
import routeNotFound from "./4-middleware/route-not-found";
import catchAll from "./4-middleware/catch-all";
import appConfig from "./2-utils/app-config";
import dal from "./2-utils/dal";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", missionController);
server.use("/api", authController);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, async () => {
    dal.connect();
    console.log("Listening on http://localhost:" + appConfig.port);
});

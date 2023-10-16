import { LocationModel } from "../3-models/location-model";
import { MissionModel } from "../3-models/mission-model";

// Get all missions:
function getAllMissions(): Promise<any[]> {
    return MissionModel.find()
        .populate('travelCode')
        .populate('source')
        .populate({
            path: 'stations.startingPoint stations.destination',
            model: LocationModel,
            select: 'locationName'
        })
        .exec()
        .then((missions: any[]) => {
            return missions.map(mission => {
                return {
                    ...mission.toObject(),
                    travelId: mission.travelCode ? mission.travelCode.travelCode : null,
                    sourceId: mission.source ? mission.source.sourceName : null,
                    startingPoint: mission.stations.startingPoint ? mission.stations.startingPoint.locationName : null,
                    destination: mission.stations.destination ? mission.stations.destination.locationName : null
                };
            });
        });
}


export default {
    getAllMissions
}
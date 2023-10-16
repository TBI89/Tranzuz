import { LocationModel } from "../3-models/location-model";
import { MissionModel } from "../3-models/mission-model";

// Get all missions:
function getAllMissions(): Promise<any[]> {
    return MissionModel.find()
        .populate('travelCode')
        .populate('source')
        .populate({
            path: 'startingPointLocation', // Populate the 'startingPoint' virtual.
            select: 'locationName', // Select the locationName field.
            model: LocationModel
        })
        .populate({
            path: 'destinationLocation', // Populate the 'destination' virtual.
            select: 'locationName', // Select the locationName field.
            model: LocationModel
        })
        .exec()
        .then((missions: any[]) => {
            return missions.map(mission => {
                return {
                    ...mission.toObject(),
                    travelId: mission.travelCode ? mission.travelCode.travelCode : null,
                    sourceId: mission.source ? mission.source.sourceName : null,
                    stations: {
                        startingPoint: mission.startingPointLocation ? mission.startingPointLocation.locationName : null,
                        destination: mission.destinationLocation ? mission.destinationLocation.locationName : null
                    }
                };
            });
        });
}

export default {
    getAllMissions
}

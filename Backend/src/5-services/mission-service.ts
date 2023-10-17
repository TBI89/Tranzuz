import { LocationModel } from "../3-models/location-model";
import { MissionModel } from "../3-models/mission-model";

// Get all missions:
function getAllMissions(): Promise<any[]> {
    return MissionModel.find()
        .populate('tripIdVirtual', 'tripId') // Populate the 'tripId' virtual and select the 'tripId' field.
        .populate('sourceIdVirtual', 'sourceName') // Populate the 'sourceId' virtual and select the 'sourceName' field.
        .populate({
            path: 'startingPointVirtual', // Populate the 'startingPointVirtual' virtual.
            select: 'locationName', // Select the 'locationName' field.
            model: LocationModel
        })
        .populate({
            path: 'destinationVirtual', // Populate the 'destinationVirtual' virtual.
            select: 'locationName', // Select the 'locationName' field.
            model: LocationModel
        })
        .populate('lineIdVirtual', 'lineId') // Populate the 'lineId' virtual and select the 'lineId' field.
        .populate('lineNumberVirtual', 'lineNumber') // Populate the 'lineNumber' virtual and select the 'lineNumber' field.
        .populate('lineDirectionVirtual', 'direction') // Populate the 'lineDirection' virtual and select the 'direction' field.
        .populate('lineAlternativeVirtual', 'alternative') // Populate the 'lineAlternative' virtual and select the 'alternative' field.
        .exec()
        .then((missions: any[]) => {
            return missions.map(mission => {
                return {
                    ...mission.toObject(),
                    tripId: mission.tripIdVirtual ? mission.tripIdVirtual.tripId : null,
                    sourceId: mission.sourceIdVirtual ? mission.sourceIdVirtual.sourceName : null,
                    stops: {
                        startingPoint: mission.startingPointVirtual ? mission.startingPointVirtual.locationName : null,
                        destination: mission.destinationVirtual ? mission.destinationVirtual.locationName : null
                    },
                    lineData: {
                        lineId: mission.lineIdVirtual ? mission.lineIdVirtual.lineId : null,
                        lineNumber: mission.lineNumberVirtual ? mission.lineNumberVirtual.lineNumber : null,
                        direction: mission.lineDirectionVirtual ? mission.lineDirectionVirtual.direction : null,
                        alternative: mission.lineAlternativeVirtual ? mission.lineAlternativeVirtual.alternative : null
                    }
                };
            });
        });
}

export default {
    getAllMissions
};

import { ResourceNotFoundError } from "../3-models/client-errors";
import { LocationModel } from "../3-models/location-model";
import { MissionModel } from "../3-models/mission-model";

// Get all missions:
function getAllMissions(): Promise<any[]> {

    // Display all the items on the MissionModel array:
    return MissionModel.find()

        // Populate the virtual fields:
        .populate('tripIdVirtual', 'tripId')
        .populate('sourceIdVirtual', 'sourceName')
        .populate({
            path: 'startingPointVirtual',
            select: 'locationName',
            model: LocationModel
        })
        .populate({
            path: 'destinationVirtual',
            select: 'locationName',
            model: LocationModel
        })
        .populate('lineIdVirtual', 'lineId')
        .populate('lineNumberVirtual', 'lineNumber')
        .populate('lineDirectionVirtual', 'direction')
        .populate('lineAlternativeVirtual', 'alternative')
        .populate('lineDescriptionVirtual', 'description')

        // Execute query:
        .exec()

        // Map all missions & convert them to objects:
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
                        alternative: mission.lineAlternativeVirtual ? mission.lineAlternativeVirtual.alternative : null,
                        description: mission.lineDescriptionVirtual ? mission.lineDescriptionVirtual.description : null
                    }
                };
            });
        });
}

// Function to retrieve a single mission from the database:
function getSingleMissionById(missionId: string): Promise<any | null> {

    // Query the MissionModel to find a mission by its unique identifier and populate virtual fields:
    return MissionModel.findOne({ _id: missionId })

        // Populate the virtual fields for easier access and readability:
        .populate('tripIdVirtual', 'tripId')
        .populate('sourceIdVirtual', 'sourceName')
        .populate({
            path: 'startingPointVirtual',
            select: 'locationName',
            model: LocationModel
        })
        .populate({
            path: 'destinationVirtual',
            select: 'locationName',
            model: LocationModel
        })
        .populate('lineIdVirtual', 'lineId')
        .populate('lineNumberVirtual', 'lineNumber')
        .populate('lineDirectionVirtual', 'direction')
        .populate('lineAlternativeVirtual', 'alternative')
        .populate('lineDescriptionVirtual', 'description')

        // Execute the query and handle the returned promise:
        .exec()

        // Transform the retrieved mission into the desired object format:
        .then((mission: any | null) => {
            if (mission) {
                return {
                    ...mission.toObject(), // Convert the mission to a plain JavaScript object
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
                        alternative: mission.lineAlternativeVirtual ? mission.lineAlternativeVirtual.alternative : null,
                        description: mission.lineDescriptionVirtual ? mission.lineDescriptionVirtual.description : null
                    }
                };
            }
            return null; // Return null if the mission is not found
        });
}

// Update mission by _id:
async function updateMissionById(_id: string, propName: string, propValue: any): Promise<any | null> {

    if (!_id) throw new ResourceNotFoundError(_id); // Check if the mission exist.
    const updatedMission = await MissionModel.findByIdAndUpdate(
        _id,
        { [propName]: propValue }, // Dynamically change the "propName" value with "propValue" value.
        { new: true }
    )
        .populate('tripIdVirtual', 'tripId')
        .populate('sourceIdVirtual', 'sourceName')
        .populate('startingPointVirtual', 'locationName')
        .populate('destinationVirtual', 'locationName')
        .populate('lineIdVirtual', 'lineId')
        .populate('lineNumberVirtual', 'lineNumber')
        .populate('lineDirectionVirtual', 'direction')
        .populate('lineAlternativeVirtual', 'alternative')
        .populate('lineDescriptionVirtual', 'description');

    return updatedMission;
}

export default {
    getAllMissions,
    getSingleMissionById,
    updateMissionById
};

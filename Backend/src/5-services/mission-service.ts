import mongoose from "mongoose";
import { ResourceNotFoundError, ValidationError } from "../3-models/client-errors";
import { LineModel } from "../3-models/line-model";
import { LocationModel } from "../3-models/location-model";
import { IMissionModel, MissionModel } from "../3-models/mission-model";

// Get all missions:
function getAllMissions(): Promise<IMissionModel[]> {

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
function getSingleMissionById(missionId: string): Promise<IMissionModel | null> {

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
async function updateMissionById(_id: string, propName: string, propValue: any): Promise<IMissionModel | null> {
    if (!_id) throw new ResourceNotFoundError(_id); // Check if the mission exists.

    const updatedMission = await MissionModel.findByIdAndUpdate(
        _id,
        { [propName]: propValue },
        { new: true }
    )
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
        .populate({
            path: 'lineIdVirtual',
            select: 'lineId',
            model: LineModel
        })
        .populate('lineIdVirtual', 'lineId')
        .populate('lineNumberVirtual', 'lineNumber')
        .populate('lineDirectionVirtual', 'direction')
        .populate('lineAlternativeVirtual', 'alternative')
        .populate('lineDescriptionVirtual', 'description')
        .exec();

    if (!updatedMission) throw new ValidationError("יש לעדכן את השדה הנבחר");

    // Convert the updated mission to a plain JavaScript object
    const plainUpdatedMission = updatedMission.toObject();
    return plainUpdatedMission;
}

// Remove existing mission by it's _id:
async function deleteMission(_id: string): Promise<void> {
    const deletedMission = await MissionModel.findByIdAndDelete(_id).exec();
    if (!deletedMission) throw new ResourceNotFoundError(_id);
}

// Duplicate an existing mission instance:
async function duplicateMission(_id: string): Promise<IMissionModel> {
    const existingMission = await MissionModel.findById(_id);
    if (!existingMission) throw new ResourceNotFoundError(_id);
    const newMission = new MissionModel({
        ...existingMission.toObject(),
        _id: new mongoose.Types.ObjectId()
    });
    const duplicatedMission = await newMission.save();
    return duplicatedMission;
}

export default {
    getAllMissions,
    getSingleMissionById,
    updateMissionById,
    deleteMission,
    duplicateMission
};

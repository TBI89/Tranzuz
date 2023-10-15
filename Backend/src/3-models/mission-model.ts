import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { LocationModel } from "./location-model";
import { TravelModel } from "./travel-model";
import { SourceModel } from "./source-model";

// 1. Interface:
export interface IMissionModel extends Document {
    missionNumber: number;
    direction: number;
    alternative: string; // or number?
    locationId: ObjectId; // location collection (startingPoint / destination).
    description: string;
    travelId: ObjectId; // Travel collection (travelName).
    departureTime: string; // localTimeSting.
    effectiveDepartureTime: string; // localTimeString.
    dayOfTheWeek: string; // localDateString.
    startingDate: string; // localDateString.
    endingDate: string; // localDateString.
    sourceId: ObjectId; // source collection (sourceName).
    missionType: string;
    affectedMission: number;
    affectedMissionDirection: number;
    affectedMissionAlternative: string; // or number?
    affectedMissionDescription: string;
}

// 2. Schema:
export const MissionSchema = new Schema<IMissionModel>({
    missionNumber: {
        type: Number,
        required: [true, "יש להזין את מספר הקו."]
    },
    direction: {
        type: Number,
        required: [true, "יש להזין כיוון."]
    },
    alternative: {
        type: String
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId
    },
    description: {
        type: String,
        required: [true, "יש להזין תיאור."]
    },
    travelId: {
        type: mongoose.Schema.Types.ObjectId
    },
    departureTime: {
        type: String,
        required: [true, "יש להזין שעת יציאה."]
    },
    effectiveDepartureTime: {
        type: String,
        required: [true, "יש להזין שעת יציאה אפקטיבית."]
    },
    dayOfTheWeek: {
        type: String,
        required: [true, "יש לבחור יום."]
        // Add custom validation for possible days to enter.
    },
    startingDate: {
        type: String,
        required: [true, "יש לבחור תאריך התחלה."]
        // Add custom validation for picking a valid starting date.
    },
    endingDate: {
        type: String,
        required: [true, "יש לבחור תאריך סיום."]
        // Add custom validation for picking a valid ending date.
    },
    sourceId: {
        type: mongoose.Schema.Types.ObjectId
    },
    missionType: {
        type: String,
        required: [true, "יש לבחור סוג."]
    },
    affectedMission: {
        type: Number
    },
    affectedMissionDirection: {
        type: Number
    },
    affectedMissionAlternative: {
        type: String
    },
    affectedMissionDescription: {
        type: String
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true }, // Return foreign key in JSON.
    id: false // Don't add id on top of _id.

});

// 3. Virtuals:
MissionSchema.virtual("locations", {
    ref: LocationModel, // Foreign model.
    localField: "locationId", // Foreign key.
    foreignField: "_id", // Primary key.
    justOne: true // Mission has only one location (startingPoint / destination).
});

MissionSchema.virtual("travelCode", {
    ref: TravelModel, // Foreign model.
    localField: "travelId", // Foreign key.
    foreignField: "_id", // Primary key.
    justOne: true // Mission has only one travelId.
});

MissionSchema.virtual("source", {
    ref: SourceModel, // Foreign model.
    localField: "sourceId", // Foreign key.
    foreignField: "_id", // Primary key.
    justOne: true // Mission has only one source.
});

// 4. Model:
export const MissionModel = model<IMissionModel>("MissionModel", MissionSchema, "missions");
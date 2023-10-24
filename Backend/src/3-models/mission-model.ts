import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { LocationModel } from "./location-model";
import { TripModel } from "./trip-model";
import { SourceModel } from "./source-model";
import { LineModel } from "./line-model";

// 1. Interface:
export interface IMissionModel extends Document {
    lineData: { // lines collection.
        lineId: ObjectId;
        lineNumber: ObjectId;
        direction: ObjectId;
        alternative: ObjectId;
        description: ObjectId;
    }
    stops: { // locations collection(locationName).
        startingPoint: ObjectId;
        destination: ObjectId;
    }
    tripId: ObjectId; // trips collection (tripId).
    departureTime: string;
    effectiveDepartureTime: string; 
    dayOfTheWeek: number;
    startingDate: string;
    endingDate: string;
    sourceId: ObjectId; // source collection (sourceName).
    missionType: string;
    affectedMission: number;
    affectedMissionDirection: number;
    affectedMissionAlternative: string;
    affectedMissionDescription: string;
}

// 2. Schema:
export const MissionSchema = new Schema<IMissionModel>({

    lineData: {
        lineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: LineModel
        },
        lineNumber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: LineModel
        },
        direction: {
            type: mongoose.Schema.Types.ObjectId,
            ref: LineModel
        },
        alternative: {
            type: mongoose.Schema.Types.ObjectId,
            ref: LineModel
        },
        description: {
            type: mongoose.Schema.Types.ObjectId,
            ref: LineModel
        }
    },

    stops: {
        startingPoint: {
            type: mongoose.Schema.Types.ObjectId,
            ref: LocationModel,
            required: [true, "יש להזין את נקודת המוצא"]
        },
        destination: {
            type: mongoose.Schema.Types.ObjectId,
            ref: LocationModel,
            required: [true, "יש להזין יעד."]
        },
    },
    tripId: {
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
        type: Number,
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
        type: mongoose.Schema.Types.ObjectId,
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
MissionSchema.virtual("lineIdVirtual", {
    ref: LineModel,
    localField: "lineData.lineId",
    foreignField: "_id",
    justOne: true
});

MissionSchema.virtual("lineNumberVirtual", {
    ref: LineModel,
    localField: "lineData.lineNumber",
    foreignField: "_id",
    justOne: true,
});

MissionSchema.virtual("lineDirectionVirtual", {
    ref: LineModel,
    localField: "lineData.direction",
    foreignField: "_id",
    justOne: true,
});

MissionSchema.virtual("lineAlternativeVirtual", {
    ref: LineModel,
    localField: "lineData.alternative",
    foreignField: "_id",
    justOne: true,
});

MissionSchema.virtual("lineDescriptionVirtual", {
    ref: LineModel,
    localField: "lineData.description",
    foreignField: "_id",
    justOne: true,
});

MissionSchema.virtual("startingPointVirtual", {
    ref: LocationModel,
    localField: "stops.startingPoint",
    foreignField: "_id",
    justOne: true,
    populate: {
        path: "startingPoint destination",
        model: LocationModel
    }
});

MissionSchema.virtual("destinationVirtual", {
    ref: LocationModel,
    localField: "stops.destination",
    foreignField: "_id",
    justOne: true,
    populate: {
        path: "destination destination",
        model: LocationModel
    }
});

MissionSchema.virtual("tripIdVirtual", {
    ref: TripModel, // Foreign model.
    localField: "tripId", // Foreign key.
    foreignField: "_id", // Primary key.
    justOne: true // Mission has only one tripId.
});

MissionSchema.virtual("sourceIdVirtual", {
    ref: SourceModel, // Foreign model.
    localField: "sourceId", // Foreign key.
    foreignField: "_id", // Primary key.
    justOne: true // Mission has only one source.
});

// 4. Model:
export const MissionModel = model<IMissionModel>("MissionModel", MissionSchema, "missions");
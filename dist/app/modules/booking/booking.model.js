"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Service",
    },
    slotId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Slot",
    },
    // vehicleType: {
    //   type: String,
    //   enum: [
    //     "car", "truck", "SUV", "van", "motorcycle", "bus",
    //     "electricVehicle", "hybridVehicle", "bicycle", "tractor"
    //   ],
    //   required: true,
    // },
    // vehicleBrand: {
    //   type: String,
    //   required: true,
    // },
    // vehicleModel: {
    //   type: String,
    //   required: true,
    // },
    // manufacturingYear: {
    //   type: Number,
    //   required: true,
    // },
    // registrationPlate: {
    //   type: String,
    //   required: true,
    // },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.serviceId;
            delete ret.slotId;
            delete ret.__v;
            return ret;
        }
    }
});
// Virtual populate for service
bookingSchema.virtual('service', {
    ref: 'Service',
    localField: 'serviceId',
    foreignField: '_id',
    justOne: true,
});
// Virtual populate for slot
bookingSchema.virtual('slot', {
    ref: 'Slot',
    localField: 'slotId',
    foreignField: '_id',
    justOne: true,
});
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);

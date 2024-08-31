"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const createBooking = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: "Service ID is required",
        }),
        slotId: zod_1.z.string({
            required_error: "Slot ID is required",
        }),
        // vehicleType: z.enum(
        //   [
        //     "car",
        //     "truck",
        //     "SUV",
        //     "van",
        //     "motorcycle",
        //     "bus",
        //     "electricVehicle",
        //     "hybridVehicle",
        //     "bicycle",
        //     "tractor",
        //   ],
        //   {
        //     required_error: "Vehicle type is required",
        //   }
        // ),
        // vehicleBrand: z.string({
        //   required_error: "Vehicle brand is required",
        // }),
        // vehicleModel: z.string({
        //   required_error: "Vehicle model is required",
        // }),
        // manufacturingYear: z.number({
        //   required_error: "Manufacturing year is required",
        // }),
        // registrationPlate: z.string({
        //   required_error: "Registration plate is required",
        // }),
    }),
});
exports.bookingValidation = {
    createBooking,
};

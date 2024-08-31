"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotValidation = void 0;
const zod_1 = require("zod");
const createSlot = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.string({
            required_error: "Service ID is required",
        }),
        date: zod_1.z.string({
            required_error: "Date is required",
        }),
        startTime: zod_1.z.string({
            required_error: "Start time is required",
        }),
        endTime: zod_1.z.string({
            required_error: "End time is required",
        })
    }),
});
exports.slotValidation = {
    createSlot,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const zod_1 = require("zod");
const createService = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
        })
            .min(1, "Name cannot be empty"),
        image: zod_1.z
            .string({
            required_error: "Image is required",
        })
            .min(1, "Image cannot be empty"),
        description: zod_1.z.string().optional(),
        price: zod_1.z
            .number({
            required_error: "Price is required",
        })
            .positive("Price must be a positive number"),
        duration: zod_1.z
            .number({
            required_error: "Duration is required",
        })
            .positive("Duration must be a positive number"),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updatedService = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().positive("Price must be a positive number").optional(),
        duration: zod_1.z
            .number()
            .positive("Duration must be a positive number")
            .optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.serviceValidation = {
    createService,
    updatedService,
};

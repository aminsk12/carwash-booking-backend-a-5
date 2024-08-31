"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        role: zod_1.z.nativeEnum(user_constant_1.USER_ROLE).default(user_constant_1.USER_ROLE.admin),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email address"),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
        phone: zod_1.z.string({
            required_error: "Phone number is required",
        }),
    }),
});
exports.UserValidations = {
    createUser,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const loginUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email address"),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
exports.authValidation = {
    loginUser,
};

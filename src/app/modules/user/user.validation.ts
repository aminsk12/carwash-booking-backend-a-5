import { z } from "zod";
import { USER_ROLE } from "./user.constant";

const createUser = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    role: z.nativeEnum(USER_ROLE).default(USER_ROLE.admin),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    password: z.string({
      required_error: "Password is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    phone: z.string({
      required_error: "Phone number is required",
    }),
  }),
});
export const UserValidations = {
  createUser,
};

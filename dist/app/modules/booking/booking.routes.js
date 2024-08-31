"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../user/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post("/bookings", (0, auth_1.auth)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(booking_validation_1.bookingValidation.createBooking), booking_controller_1.bookingController.createBooking);
router.get("/bookings", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingController.getAllBookings);
router.get("/my-bookings", (0, auth_1.auth)(user_constant_1.USER_ROLE.user), booking_controller_1.bookingController.getUserBookings);
exports.bookingRoutes = router;

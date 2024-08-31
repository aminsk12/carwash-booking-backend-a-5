"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const service_routes_1 = require("../modules/service/service.routes");
const slot_routes_1 = require("../modules/slot/slot.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const review_routes_1 = require("../modules/review/review.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/services",
        route: service_routes_1.ServiceRoutes,
    },
    {
        path: "/slots",
        route: slot_routes_1.SlotRoutes,
    },
    {
        path: "/reviews",
        route: review_routes_1.reviewRoutes,
    },
    {
        path: "/payment",
        route: payment_routes_1.paymentRoutes,
    },
    {
        path: "/",
        route: booking_routes_1.bookingRoutes,
    },
];
moduleRoutes.forEach((e) => router.use(e.path, e.route));
exports.default = router;

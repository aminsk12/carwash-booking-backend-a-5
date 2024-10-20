"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const service_model_1 = require("../service/service.model");
const booking_model_1 = require("./booking.model");
const slot_mode_1 = require("../slot/slot.mode");
const user_model_1 = require("../user/user.model");
const payment_utils_1 = require("../payment/payment.utils");
const createBooking = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the service exists
    const service = yield service_model_1.Service.findById(payload.serviceId);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found");
    }
    // Validate the user exists
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Validate the slot exists
    const slot = yield slot_mode_1.Slot.findById(payload.slotId);
    if (!slot) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot not found");
    }
    // Ensure the slot is available
    if (slot.isBooked !== "available") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Slot is already booked");
    }
    // Create the booking
    const bookingPayload = Object.assign(Object.assign({}, payload), { customer: userId });
    const booking = yield booking_model_1.Booking.create(bookingPayload);
    const transactionId = `TXN-${Date.now()}`;
    const paymentData = {
        transactionId,
        totalPrice: service.price, // Assuming the service price is the total price
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone,
        customerAddress: user.address,
    };
    //! Payment
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
    console.log(paymentSession);
    // Update slot status to booked
    slot.isBooked = "booked";
    yield slot.save();
    // Populate related fields
    const populatedBooking = yield booking.populate([
        {
            path: "customer",
            select: "_id name email phone address",
        },
        {
            path: "service",
            select: "_id name description image price duration isDeleted",
        },
        {
            path: "slot",
            select: "_id service date startTime endTime isBooked",
        },
    ]);
    return { populatedBooking, paymentSession };
    // return populatedBooking;
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate([
        {
            path: "customer",
            select: "_id name email phone address",
        },
        {
            path: "service",
            select: "_id name description price duration isDeleted",
        },
        {
            path: "slot",
            select: "_id service date startTime endTime isBooked",
        },
    ]);
    return result;
});
const getUserBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.Booking.find({ customer: userId })
        .select("-customer")
        .populate({
        path: "service",
        select: "_id name description price duration isDeleted",
    })
        .populate({
        path: "slot",
        select: "_id service date startTime endTime isBooked",
    });
    // .lean();
    return bookings;
});
exports.bookingServices = {
    createBooking,
    getAllBookings,
    getUserBookings,
};

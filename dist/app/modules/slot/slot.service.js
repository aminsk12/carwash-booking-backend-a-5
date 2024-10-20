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
exports.SlotServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const service_model_1 = require("../service/service.model");
const slot_mode_1 = require("./slot.mode");
const mongoose_1 = __importDefault(require("mongoose"));
const createSlot = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(payload.service);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Assume service duration is in minutes (e.g., 60 minutes)
        const serviceDuration = service.duration;
        // Convert startTime and endTime to minutes since midnight
        const [startHour, startMinute] = payload.startTime.split(":").map(Number);
        const [endHour, endMinute] = payload.endTime.split(":").map(Number);
        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;
        // Calculate the total available duration
        const totalDuration = endTotalMinutes - startTotalMinutes;
        // Calculate the number of slots
        // const numberOfSlots = totalDuration / serviceDuration;
        const numberOfSlots = Math.floor(totalDuration / serviceDuration);
        const slots = [];
        let currentStartTime = startTotalMinutes;
        for (let i = 0; i < numberOfSlots; i++) {
            const currentEndTime = currentStartTime + serviceDuration;
            // Convert minutes back to HH:mm format
            const startHourStr = String(Math.floor(currentStartTime / 60)).padStart(2, "0");
            const startMinuteStr = String(currentStartTime % 60).padStart(2, "0");
            const endHourStr = String(Math.floor(currentEndTime / 60)).padStart(2, "0");
            const endMinuteStr = String(currentEndTime % 60).padStart(2, "0");
            const slotStartTime = `${startHourStr}:${startMinuteStr}`;
            const slotEndTime = `${endHourStr}:${endMinuteStr}`;
            // // Check for overlapping slots
            // const existingSlot = await Slot.findOne({
            //   service: payload.service,
            //   date: payload.date,
            //   startTime: { $lt: slotEndTime },
            //   endTime: { $gt: slotStartTime },
            // }).session(session);
            // if (existingSlot) {
            //   throw new AppError(
            //     httpStatus.CONFLICT,
            //     "Slot timing conflicts with an existing slot"
            //   );
            // }
            // Create the slot if no conflicts are found
            const slot = yield slot_mode_1.Slot.create([
                {
                    service: payload.service,
                    date: payload.date,
                    startTime: slotStartTime,
                    endTime: slotEndTime,
                    isBooked: "available",
                },
            ], { session });
            slots.push(slot[0]);
            currentStartTime = currentEndTime;
        }
        yield session.commitTransaction();
        return slots;
    }
    catch (err) {
        console.log(err);
        yield session.abortTransaction();
        throw new Error("Failed to create slots");
    }
    finally {
        session.endSession();
    }
});
const getAllSlots = (date, serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    // const filter: any = { isBooked: "available" };
    const filter = {};
    if (date) {
        filter.date = new Date(date);
    }
    if (serviceId) {
        filter.service = serviceId;
    }
    const slots = yield slot_mode_1.Slot.find(filter).populate("service");
    return slots;
});
const getSingleSlot = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slot = yield slot_mode_1.Slot.findById(id).populate("service");
        if (!slot) {
            throw new Error("Slot not found");
        }
        return slot;
    }
    catch (error) {
        console.error("Error retrieving slot:", error);
        throw error;
    }
});
const updateSlotStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const slot = yield slot_mode_1.Slot.findById(id);
    if (!slot) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot not found");
    }
    // Check if the slot is already booked
    if (slot.isBooked === 'booked') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Cannot update a booked slot");
    }
    // Only allow status to be updated to 'available' or 'cancelled'
    if (status !== 'available' && status !== 'cancelled') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid status update");
    }
    slot.isBooked = status;
    yield slot.save();
    return slot;
});
exports.SlotServices = {
    createSlot,
    getAllSlots,
    getSingleSlot,
    updateSlotStatus,
};

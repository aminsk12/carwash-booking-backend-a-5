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
exports.SlotController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const slot_service_1 = require("./slot.service");
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const createSlot = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (slot_service_1.SlotServices === null || slot_service_1.SlotServices === void 0 ? void 0 : slot_service_1.SlotServices.createSlot(req.body));
    // console.log(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Slot is Created Successfully",
        data: result,
    });
}));
const getAllSlots = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, serviceId } = req.query;
    const result = yield (slot_service_1.SlotServices === null || slot_service_1.SlotServices === void 0 ? void 0 : slot_service_1.SlotServices.getAllSlots(date, serviceId));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result,
    });
}));
const getSingleSlot = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slotId } = req.params;
    const result = yield (slot_service_1.SlotServices === null || slot_service_1.SlotServices === void 0 ? void 0 : slot_service_1.SlotServices.getSingleSlot(slotId));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result,
    });
}));
const updateSlotStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slotId } = req.params;
    const { isBooked } = req.body;
    const result = yield slot_service_1.SlotServices.updateSlotStatus(slotId, isBooked);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Slot status updated successfully",
        data: result,
    });
}));
exports.SlotController = {
    createSlot,
    getAllSlots,
    getSingleSlot,
    updateSlotStatus,
};

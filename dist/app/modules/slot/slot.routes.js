"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const slot_controller_1 = require("./slot.controller");
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get("/availability", slot_controller_1.SlotController.getAllSlots);
router.get("/availability/:slotId", slot_controller_1.SlotController.getSingleSlot);
router.patch("/:slotId", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), slot_controller_1.SlotController.updateSlotStatus);
exports.SlotRoutes = router;

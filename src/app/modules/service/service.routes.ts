import express from "express";
import { serviceController } from "./service.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { serviceValidation } from "./service.validation";
import { SlotController } from "../slot/slot.controller";
import { slotValidation } from "../slot/slot.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(serviceValidation.createService),
  serviceController.createService
);

router.post(
  "/slots",
  validateRequest(slotValidation.createSlot),
  auth(USER_ROLE.admin),
  SlotController.createSlot
);

router.patch(
  "/:serviceId",
  auth(USER_ROLE.admin),
  validateRequest(serviceValidation.updatedService),
  serviceController.updateService
);

router.delete(
  "/:serviceId",
  auth(USER_ROLE.admin),
  serviceController.deleteService
);

router.get("/", serviceController.getAllServices);

router.get("/:serviceId", serviceController.getSingleService);

export const ServiceRoutes = router;

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
exports.serviceServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const service_model_1 = require("./service.model");
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield service_model_1.Service.findOne({ name: payload.name });
    if (isExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "This Service is Already Exist");
    }
    const result = yield service_model_1.Service.create(payload);
    return result;
});
const getAllServices = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceQuery = new QueryBuilder_1.default(service_model_1.Service.find(), query)
        .search(["name", "description"])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield serviceQuery.modelQuery;
    // let searchTerm = "";
    // if (query?.searchTerm) {
    //   searchTerm = query.searchTerm as string;
    // }
    // const searchableFields = ["name", "description"];
    // // {title: {$regex: searchTerm}}
    // // {genre: {$regex: searchTerm}}
    // const result = await Service.find({
    //   $or: searchableFields.map((field) => ({
    //     [field]: { $regex: searchTerm, $options: "i" },
    //   })),
    // });
    return result;
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(id);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service is not Found");
    }
    return service;
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(id);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service is not Found");
    }
    // const isExist = await Service.findOne({ name: payload.name });
    // if (isExist) {
    //   throw new AppError(httpStatus.CONFLICT, "This Service is Already Exist");
    // }
    const result = yield service_model_1.Service.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
// const deleteService = async (id: string) => {
//   const service = await Service.findById(id);
//   if (!service) {
//     throw new AppError(httpStatus.NOT_FOUND, "Service is not Found");
//   }
//   // const result = await Service.findByIdAndDelete(id);
//   service.isDeleted = true;
//   const result = await service.save();
//   return result;
// };
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(id);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service is not Found");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Set isDeleted to true for the service
        const service = yield service_model_1.Service.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        yield session.commitTransaction();
        yield session.endSession();
        return service;
    }
    catch (err) {
        console.error(err);
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found");
    }
});
exports.serviceServices = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};

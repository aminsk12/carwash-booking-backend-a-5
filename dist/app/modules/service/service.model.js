"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
});
// Query Middleware
serviceSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
serviceSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
serviceSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.Service = (0, mongoose_1.model)("Service", serviceSchema);

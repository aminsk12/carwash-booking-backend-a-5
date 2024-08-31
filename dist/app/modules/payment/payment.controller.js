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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const payment_service_1 = require("./payment.service");
const confirmationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    yield payment_service_1.paymentServices.confirmationService(transactionId);
    res.send(`
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #f0fdf4;">
      <div style="background-color: white; padding: 2rem; border-radius: 1rem; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); text-align: center;">
        <h1 style="font-size: 2rem; font-weight: bold; color: #16a34a; margin-bottom: 1rem;">Payment Successful!</h1>
        <p style="color: #4b5563; margin-bottom: 2rem;">Thank you for your payment. Your booking has been confirmed.</p>
        <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
          <svg style="width: 4rem; height: 4rem; color: #16a34a;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <a href="http://localhost:5173/" style="background-color: #16a34a; color: white; padding: 0.5rem 1.5rem; border-radius: 0.375rem; text-decoration: none; display: inline-block; transition: background-color 0.2s;">
          Go to Home
        </a>
      </div>
    </div>
  `);
});
exports.paymentController = {
    confirmationController,
};

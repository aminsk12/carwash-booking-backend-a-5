import { Request, Response } from "express";
import { paymentServices } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId } = req.query;

   await paymentServices.confirmationService(
    transactionId as string
  );

  res.send(`
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #f0fdf4;">
      <div style="background-color: white; padding: 2rem; border-radius: 1rem; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); text-align: center;">
      <img src="https://i.ibb.co/F3yMzyV/check-tick-mark-on-wavy-edge-green-circle-sticker-vector-47744496-removebg-preview.png" alt="Girl in a jacket" width="200" height="200">
        <h1 style="font-size: 2rem; font-weight: bold; color: #16a34a; margin-bottom: 1rem;">Payment Successful!</h1>
        <p style="color: #4b5563; margin-bottom: 2rem;">Thank you for your payment. Your booking has been confirmed.</p>
        <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
          
        </div>
        <a href="https://car-wash-booking-frontend-a-5.vercel.app/" style="background-color: #16a34a; color: white; padding: 0.5rem 1.5rem; border-radius: 0.375rem; text-decoration: none; display: inline-block; transition: background-color 0.2s;">
          Go to Home
          <svg style="width: 1rem; height: 1rem; color: #fff;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </a>
      </div>
    </div>
  `);
};

export const paymentController = {
  confirmationController,
};

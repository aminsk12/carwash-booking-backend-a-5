
import { Slot } from "../slot/slot.mode";

const confirmationService = async (transactionId: string) => {
  
  const result = await Slot.findOneAndUpdate(
    { transactionId },
    {
      isBooked: "booked",
    },
    { new: true }
  );

  return result;
};

export const paymentServices = {
  confirmationService,
};

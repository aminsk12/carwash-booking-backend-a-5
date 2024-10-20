import express from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://car-wash-booking-frontend-a-5.vercel.app', 
  //origin: 'http://localhost:5173/', 
  
}));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Car Washing System");
});

app.use(globalErrorHandler);

// Not Found Route
app.use(notFound);

export default app;

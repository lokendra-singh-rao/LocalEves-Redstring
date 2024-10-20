import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./configs/mongo.connection.js";
import authRoutes from "./routes/auth.route.js";
import organiserRoutes from "./routes/organiser.route.js";
import cookieParser from "cookie-parser";
import participantRoutes from "./routes/participant.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({ origin: "https://lokendra-server.koyeb.app", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectDb();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/organiser", organiserRoutes);
app.use("/api/v1/participant", participantRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

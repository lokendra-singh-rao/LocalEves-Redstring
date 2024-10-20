import { Router } from "express";
import { getAllEvents, getEvent, getRegisteredEvents, getUpcomingEvents, registerEvent } from "../controllers/participant.controller.js";
import { authenticateParticipant } from "../middlewares/auhenticate.participant.js";

const participantRoutes = Router();

participantRoutes.get("/get-event/:id", authenticateParticipant, getEvent);
participantRoutes.get("/get-all-events", authenticateParticipant, getAllEvents);
participantRoutes.post("/register/:eventId", authenticateParticipant, registerEvent);
participantRoutes.get("/get-upcoming-events", authenticateParticipant, getUpcomingEvents);
participantRoutes.get("/get-registered-events", authenticateParticipant, getRegisteredEvents);

export default participantRoutes;

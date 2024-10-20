import { Router } from "express";
import { createEvent, getEvent, getMyEvents, getUpcomingEvents } from "../controllers/organiser.controller.js";
import { authenticateOrganiser } from "../middlewares/auhenticate.organiser.js";

const organiserRoutes = Router();

organiserRoutes.post("/create-event", authenticateOrganiser, createEvent);
organiserRoutes.get("/get-events", authenticateOrganiser, getMyEvents);
organiserRoutes.get("/get-event/:id", authenticateOrganiser, getEvent);
organiserRoutes.get("/get-upcoming-events", authenticateOrganiser, getUpcomingEvents);

export default organiserRoutes;

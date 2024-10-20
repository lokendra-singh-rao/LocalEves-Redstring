import { findAllEvents, findEventById, findUpcomingEvents } from "../models/event.model.js";
import { addEvent, findEventRegistration, findRegisteredEvents } from "../models/registration.model.js";

export const getEvent = async ({ id, userId }) => {
  const event = await findEventById({ id });
  const eventRegistration = await findEventRegistration({ eventId: id, userId });
  let isUserRegistered = false;

  if (eventRegistration) {
    isUserRegistered = true;
  }

  if (event) {
    return { ok: true, status: 200, data: { event, isUserRegistered: isUserRegistered } };
  }

  return { ok: false, status: 404, err: "Event not found!" };
};

export const getAllEvents = async () => {
  const events = await findAllEvents();

  if (events) {
    return { ok: true, status: 200, data: events };
  }

  return { ok: false, status: 404, err: "No event found!" };
};

export const registerEvent = async ({ userId, eventId }) => {
  const event = await findEventById({ id: eventId });

  if (event) {
    const registerEvent = await addEvent({ userId, eventId });
    return { ok: true, status: 200, data: registerEvent };
  }

  return { ok: false, status: 404, err: "Event not found!" };
};

export const getUpcomingEvents = async () => {
  const events = await findUpcomingEvents();

  if (events) {
    return { ok: true, status: 200, data: events };
  }

  return { ok: false, status: 404, err: "Events not found!" };
};

export const getRegisteredEvents = async ({ userId }) => {
  const events = await findRegisteredEvents({ userId });

  if (events) {
    return { ok: true, status: 200, data: events };
  }

  return { ok: false, status: 404, err: "Events not found!" };
};

import * as eventModel from "../models/event.model.js";

export const createEvent = async ({ userId, title, description, date, mode, category, location, isPaid, ticketPrice, attendeeCapacity, poster }) => {
  const event = await eventModel.createEvent({ userId, title, description, date, mode, category, location, isPaid, ticketPrice, attendeeCapacity, poster });

  if (event) {
    return { ok: true, status: 200, data: event };
  } else {
    return { ok: false, status: 500, err: "Something went wrong! Our team is working on it" };
  }
};

export const getEvents = async ({ userId }) => {
  const myEvents = await eventModel.findMyEvents({ userId });

  return { ok: true, status: 200, data: myEvents };
};

export const getEvent = async ({ userId, id }) => {
  const event = await eventModel.fetchEventWithRegistrations({ userId, id });

  return { ok: true, status: 200, data: event };
};

export const getUpcomingEvents = async ({ userId }) => {
  const events = await eventModel.findOrganiserUpcomingEvents({ userId });

  return { ok: true, status: 200, data: events };
};

import * as organiserService from "../services/organiser.service.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, mode, category, location, isPaid, ticketPrice, attendeeCapacity, poster } = req.body;
    const userId = req.user.userId;

    if (!title || !description || !date || !mode || !category || !attendeeCapacity || !poster) return res.status(400).json({ ok: false, err: "Missing required fields!" });

    const response = await organiserService.createEvent({ userId, title, description, date, mode, category, location, isPaid, ticketPrice, attendeeCapacity, poster });

    if (!response.ok) return res.status(response.status).json({ ok: false, err: response.err });

    return res.status(response.status).json({ ok: true, data: response.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, err: "Something went wrong! Out team is working on it" });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const userId = req.user.userId;
    const response = await organiserService.getEvents({ userId });

    if (response.ok) {
      return res.status(response.status).json({ ok: true, data: response.data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, err: "Something went wrong! Out team is working on it" });
  }
};

export const getEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const response = await organiserService.getEvent({ userId, id });

    if (response.ok) {
      return res.status(response.status).json({ ok: true, data: response.data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, err: "Something went wrong! Out team is working on it" });
  }
};

export const getUpcomingEvents = async (req, res) => {
  try {
    const userId = req.user.userId;

    const response = await organiserService.getUpcomingEvents({ userId });

    if (response.ok) {
      return res.status(response.status).json({ ok: true, data: response.data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, err: "Something went wrong! Out team is working on it" });
  }
};

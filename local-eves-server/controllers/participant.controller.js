import * as participantService from "../services/participant.service.js";

export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const response = await participantService.getEvent({ id, userId: user._id });

    if (!response.ok) return res.status(response.status).json({ ok: false, err: response.err });

    return res.status(response.status).json({ ok: true, data: response.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, err: "Something went wrong! Out team is working on it" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const response = await participantService.getAllEvents();

    if (!response.ok) return res.status(response.status).json({ ok: false, err: response.err });

    return res.status(response.status).json({ ok: true, data: response.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, err: "Something went wrong! Out team is working on it" });
  }
};

export const registerEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const response = await participantService.registerEvent({ userId, eventId });

    if (!response.ok) return res.status(response.status).json({ ok: false, err: response.err });

    return res.status(response.status).json({ ok: true, data: response.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, err: "Something went wrong! Out team is working on it" });
  }
};

export const getUpcomingEvents = async (req, res) => {
  try {
    const response = await participantService.getUpcomingEvents();

    if (!response.ok) return res.status(response.status).json({ ok: false, err: response.err });

    return res.status(response.status).json({ ok: true, data: response.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, err: "Something went wrong! Out team is working on it" });
  }
};

export const getRegisteredEvents = async (req, res) => {
  try {
    const userId = req.user._id;

    const response = await participantService.getRegisteredEvents({ userId });

    if (!response.ok) return res.status(response.status).json({ ok: false, err: response.err });

    return res.status(response.status).json({ ok: true, data: response.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, err: "Something went wrong! Out team is working on it" });
  }
};

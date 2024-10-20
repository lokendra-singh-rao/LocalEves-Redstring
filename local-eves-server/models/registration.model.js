import mongoose from "mongoose";

const registrationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model("registration", registrationSchema);

export const addEvent = async ({ userId, eventId }) => {
  const registerEvent = await Registration.create({ userId, eventId });
  return registerEvent;
};

export const findEventRegistration = async ({ eventId, userId }) => {
  const eventRegistration = await Registration.findOne({ eventId, userId });
  return eventRegistration;
};

export const findRegisteredEvents = async ({ userId }) => {
  const events = await Registration.find({ userId }).populate("eventId");
  return events;
};

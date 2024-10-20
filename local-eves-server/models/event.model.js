import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    mode: {
      type: String,
      enum: ["ONLINE", "OFFLINE", "HYBRID"],
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    location: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    ticketPrice: {
      type: Number,
    },
    attendeeCapacity: {
      type: Number,
      required: true,
    },
    poster: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const EventModel = mongoose.model("event", eventSchema);

export const createEvent = async ({ userId, title, description, date, mode, category, location, isPaid, ticketPrice, attendeeCapacity, poster }) => {
  const event = await EventModel.create({ userId, title, description, date, mode, category, location, isPaid, ticketPrice, attendeeCapacity, poster });
  return event;
};

export const findEventById = async ({ id }) => {
  const event = await EventModel.findById(id);
  return event;
};

export const findAllEvents = async () => {
  const events = await EventModel.find();
  return events;
};

export const findUpcomingEvents = async () => {
  const events = await EventModel.find().sort({ createdAt: -1 }).limit(3);
  return events;
};

export const findMyEvents = async ({ userId }) => {
  const events = await EventModel.find({ userId });
  return events;
};

export const fetchEventWithRegistrations = async ({ userId, id }) => {
  const pipeline = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
        isDeleted: false,
      },
    },

    {
      $lookup: {
        from: "registrations",
        localField: "_id",
        foreignField: "eventId",
        as: "registrations",
      },
    },

    {
      $unwind: {
        path: "$registrations",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "registrations.userId",
        foreignField: "_id",
        as: "registrations.user",
      },
    },

    {
      $unwind: {
        path: "$registrations.user",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $group: {
        _id: "$_id",
        userId: { $first: "$userId" },
        title: { $first: "$title" },
        description: { $first: "$description" },
        date: { $first: "$date" },
        mode: { $first: "$mode" },
        category: { $first: "$category" },
        location: { $first: "$location" },
        isPaid: { $first: "$isPaid" },
        ticketPrice: { $first: "$ticketPrice" },
        attendeeCapacity: { $first: "$attendeeCapacity" },
        poster: { $first: "$poster" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
        users: {
          $push: {
            $cond: [
              { $ifNull: ["$registrations", false] },
              {
                fullname: "$registrations.user.fullname",
                email: "$registrations.user.email",
                registeredAt: "$registrations.createdAt",
              },
              "$$REMOVE",
            ],
          },
        },
      },
    },

    {
      $match: {
        userId: userId,
      },
    },
  ];

  const result = await EventModel.aggregate(pipeline);

  return result;
};

export const findOrganiserUpcomingEvents = async ({ userId }) => {
  const events = await EventModel.find({ userId }).limit(3);
  return events;
};

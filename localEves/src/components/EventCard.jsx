import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const { _id, title, description, date, mode, category, isPaid, ticketPrice, attendeeCapacity, poster } = event;

  const formattedDate = new Date(date).toLocaleDateString();

  const navigate = useNavigate();

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-6">
      <img className="w-full h-48 object-cover" src={poster} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-4">{description.slice(0, 100)}...</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Date: {formattedDate}</span>
          <span className="text-sm text-gray-600">Mode: {mode}</span>
        </div>
        <div className="mb-2">
          <span className="inline-block bg-blue-200 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold mr-2">{category[0]}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold">{isPaid ? `₹${ticketPrice}` : "Free"}</span>
          <span className="text-sm text-gray-600">Capacity: {attendeeCapacity}</span>
        </div>
        <button onClick={() => navigate(`/event/${_id}`)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;

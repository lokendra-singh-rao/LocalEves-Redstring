import React from "react";

function ViewParticipantEvent({ poster, title, description, category, isPaid, ticketPrice, attendeeCapacity, mode, date, isUserRegistered, handleRegister }) {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-center">
        <img className="w-full md:w-1/2 lg:w-1/3 h-72 object-cover mb-6 md:mb-0 md:mr-8" src={poster} alt={title} />
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Date: {formattedDate}</span>
            <span className="text-sm text-gray-600">Mode: {mode}</span>
          </div>
          <div className="mb-4">
            <span className="inline-block bg-blue-200 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold mr-2">{category[0]}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold">{isPaid ? `₹${ticketPrice}` : "Free"}</span>
            <span className="text-sm text-gray-600">Capacity: {attendeeCapacity}</span>
          </div>
          {isUserRegistered ? (
            <h2 className="font-bold text-green-600">You've already registered for the Event</h2>
          ) : (
            <button onClick={handleRegister} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
              {isPaid ? `Buy Ticket - ₹${ticketPrice}` : "Register for Free"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewParticipantEvent;

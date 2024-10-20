import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import { SERVER_URL } from "../../values";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/v1/participant/get-all-events`, {
        withCredentials: true,
      });
      if (response.data.ok) {
        setEvents(response.data.data);
        setLoading(false);
        setError("");
      }
    } catch (err) {
      setError("Failed to load events. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center mt-8">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="border rounded-lg shadow p-4">
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};

export default AllEvents;

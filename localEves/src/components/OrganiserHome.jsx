import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import axios from "axios";

const DashboardSection = ({ title, description, items }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <p className="text-gray-700 mb-4">{description}</p>
    <ul className="list-disc list-inside text-gray-600">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export default function OrganiserHome() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const getUpcomingEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/v1/organiser/get-upcoming-events", {
        withCredentials: true,
      });
      if (response.data.ok) {
        setUpcomingEvents(response.data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getUpcomingEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-100 py-12 px-4 sm:px-6 lg:px-8 rounded-lg mb-8">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">Welcome, Organiser!</h1>
          <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">Connect with your local community and create experiences that matter.</p>
        </div>

        <div className="w-full px-8">
          <button onClick={() => navigate(`/post-event`)} className="bg-blue-500 mb-16 w-full text-white px-4 py-4 rounded hover:bg-blue-600">
            Post Event
          </button>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Your Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard event={event} />
            ))}
          </div>
        </section>

        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <DashboardSection title="Manage Your Events" description="Track attendees and manage your upcoming events easily from your dashboard." items={["Real-time attendee tracking", "Customizable event pages", "Automated email reminders"]} />
          <DashboardSection title="Event Insights" description="Get insights on how your events are performing with detailed analytics and feedback." items={["Attendance statistics", "Feedback analysis", "Performance trends"]} />
        </section>

        <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 rounded-lg mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-center">What Organizers Say</h2>
          <div className="max-w-3xl mx-auto">
            <blockquote className="italic text-gray-700 text-center">"LocalEves has transformed how I manage my community events. It's intuitive and powerful!"</blockquote>
            <p className="text-center mt-4 font-semibold">- Jane Doe, Community Leader</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Help & Support</h2>
          <p className="text-gray-700 mb-4">If you need help with managing your events, we're here for you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="#" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center">
              Visit Support Center
            </a>
            <a href="#" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-center">
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">&copy; 2023 LocalEves. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Calendar, MapPin, Users, TrendingUp } from "lucide-react";
import banner1 from "../assets/homebanner1.jpg";
import banner2 from "../assets/homebanner2.jpg";
import banner3 from "../assets/homebanner3.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ParticipantHome = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const featuredEvents = [
    { id: 1, title: "Summer Music Festival", image: banner1 },
    { id: 2, title: "Tech Conference 2024", image: banner2 },
    { id: 3, title: "Food & Wine Expo", image: banner3 },
  ];

  const navigate = useNavigate();

  const eventCategories = ["Music", "Sports", "Tech", "Food", "Art", "Business", "Education", "Entertainment", "Health", "Community"];

  const getUpcomingEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/v1/participant/get-upcoming-events", {
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
    <div className="mx-auto flex flex-col items-center">
      <div className="bg-blue-100 py-12 px-4 sm:px-6 lg:px-8 rounded-lg  w-full">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">Welcome, Participant!</h1>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">Connect with your local organisers and create experiences that matter.</p>
      </div>

      <section className="mb-16">
        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
          {featuredEvents.map((event) => (
            <div key={event.id} className="bg-gray-50">
              <img src={event.image} alt={event.title} className="w-full h-48 sm:h-56 md:h-72 lg:h-96 object-cover" />
              <h3 className="text-xl font-semibold mt-2 pb-6">{event.title}</h3>
            </div>
          ))}
        </Carousel>
      </section>

      <section className="mb-16 px-8 w-full">
        <h2 className="text-4xl font-semibold mb-6">Upcoming Events</h2>
        <p className="mb-4">Discover exciting events happening near you. Don't miss out!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              <img src={event.poster} alt={`Event ${index}`} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
              <button onClick={() => navigate(`/event/${event._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full px-8">
        <button onClick={() => navigate(`/all-events`)} className="bg-blue-500 mb-16 w-full text-white px-4 py-4 rounded hover:bg-blue-600">
          View All Events
        </button>
      </div>

      <section className="mb-16 px-8 w-full">
        <h2 className="text-4xl font-semibold mb-6 text-center">Event Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {eventCategories.map((category) => (
            <button key={category} className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded">
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-12 px-8">
        <h2 className="text-4xl font-semibold mb-6 text-center">Why Choose LocalEves?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <Calendar size={48} className="mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Diverse Events</h3>
            <p>Find events for every interest and passion</p>
          </div>
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Local Focus</h3>
            <p>Discover what's happening in your community</p>
          </div>
          <div className="text-center">
            <Users size={48} className="mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Easy Networking</h3>
            <p>Connect with like-minded individuals</p>
          </div>
          <div className="text-center">
            <TrendingUp size={48} className="mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Grow Your Skills</h3>
            <p>Attend workshops and educational events</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParticipantHome;

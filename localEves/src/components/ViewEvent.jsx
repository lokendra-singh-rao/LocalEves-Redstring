import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ViewOrganiserEvent from "./ViewOrganiserEvent";
import ViewParticipantEvent from "./ViewParticipantEvent";
import { SERVER_URL } from "../../values";

const ViewEvent = ({ role }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [users, setUsers] = useState([]);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/participant/register/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.ok) {
        toast.success("Registered for event");
        await fetchEvent();
      }
    } catch (error) {}
  };

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/api/v1/participant/get-event/${id}`, {
        withCredentials: true,
      });

      if (response.data.ok) {
        setLoading(false);
        setEvent(response.data.data.event);
        setIsUserRegistered(response.data.data.isUserRegistered);
      }
    } catch (err) {
      setError("Error fetching event");
      console.error("Error fetching event:", err);
    }
  };

  const fetchOrganiserEvent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/api/v1/organiser/get-event/${id}`, {
        withCredentials: true,
      });

      if (response.data.ok) {
        setLoading(false);
        setEvent(response.data.data[0]);
        setUsers(response.data.data[0].users);
      }
    } catch (err) {
      setError("Error fetching event");
      console.error("Error fetching event:", err);
    }
  };

  useEffect(() => {
    if (role === "ORGANISER") {
      fetchOrganiserEvent();
    } else if (role === "PARTICIPANT") {
      fetchEvent();
    } else {
      setError("Error fetching event");
    }
  }, [id]);

  if (loading) {
    return <p className="text-center mt-8">Loading event details...</p>;
  }

  if (error) {
    return <p className="text-center mt-8">Failed to fetch event, please try again...</p>;
  }

  if (role === "ORGANISER") {
    return <ViewOrganiserEvent {...event} users={users} />;
  } else if (role === "PARTICIPANT") {
    return <ViewParticipantEvent {...event} handleRegister={handleRegister} isUserRegistered={isUserRegistered} />;
  } else {
    return <p className="text-center mt-8">Failed to fetch event, please try again...</p>;
  }
};

export default ViewEvent;

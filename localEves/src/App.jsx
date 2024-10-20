import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import OrganiserHome from "./components/OrganiserHome.jsx";
import ParticipantHome from "./components/ParticipantHome.jsx";
import AllEvents from "./components/AllEvents.jsx";
import PostEvent from "./components/PostEvent.jsx";
import ViewEvent from "./components/ViewEvent.jsx";
import NotFound from "./components/NotFound.jsx";
import RegisteredEvents from "./components/RegisteredEvents.jsx";
import MyEvents from "./components/MyEvents.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (localStorage.getItem("role")) {
      setRole(localStorage.getItem("role"));
    } else {
      setIsLoggedIn(false);
    }
  });

  const handleLogout = async () => {
    localStorage.setItem("isLoggedIn", false);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={isLoggedIn ? role === "ORGANISER" ? <OrganiserHome /> : <ParticipantHome /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to={"/"} /> : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/all-events" element={isLoggedIn ? role === "PARTICIPANT" ? <AllEvents /> : <Navigate to={"/"} /> : <Navigate to={"/login"} />} />
          <Route path="/post-event" element={isLoggedIn ? role === "ORGANISER" ? <PostEvent /> : <Navigate to={"/"} /> : <Navigate to={"/login"} />} />
          <Route path="/event/:id" element={isLoggedIn ? <ViewEvent role={role} /> : <Navigate to={"/login"} />} />
          <Route path="/registered-events" element={isLoggedIn ? <RegisteredEvents /> : <Navigate to={"/login"} />} />
          <Route path="/my-events" element={isLoggedIn ? <MyEvents /> : <Navigate to={"/login"} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

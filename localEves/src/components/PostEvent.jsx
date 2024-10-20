import React, { useState } from "react";
import axios from "axios";

const PostEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    mode: "",
    location: "",
    category: [],
    isPaid: false,
    ticketPrice: 0,
    attendeeCapacity: 0,
    poster: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const Categories = ["Music", "Sports", "Tech", "Food", "Art", "Business", "Education", "Entertainment", "Health", "Community"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setError("");
    setFormData({ ...formData, poster: "" });
    const file = e.target.files[0];

    if (file.size > 100000) {
      setError("File size must be less than 100KB");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, poster: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    const updatedCategories = formData.category.includes(value.toUpperCase()) ? formData.category.filter((category) => category !== value.toUpperCase()) : [...formData.category, value.toUpperCase()];
    setFormData({ ...formData, category: updatedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:5001/api/v1/organiser/create-event", formData);
      if (response.data.ok) {
        setSuccess("Event posted successfully!");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to post event. Please try again.");
      setLoading(false);
      setFormData({
        title: "",
        description: "",
        date: "",
        mode: "",
        location: "",
        category: [],
        isPaid: false,
        ticketPrice: 0,
        attendeeCapacity: 0,
        poster: "",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Post a New Event</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">Date</label>
          <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">Mode</label>
          <select name="mode" value={formData.mode} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Mode</option>
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">Offline</option>
          </select>
        </div>

        {formData.mode === "OFFLINE" && (
          <div className="mb-4">
            <label className="block text-lg font-medium">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-lg font-medium">Category</label>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {Categories.map((category) => (
              <div>
                <label key={category} className="flex items-center">
                  <input type="checkbox" value={category} onChange={handleCategoryChange} checked={formData.category.includes(category.toUpperCase())} />
                  <span className="ml-2">{category}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <input type="checkbox" name="isPaid" checked={formData.isPaid} onChange={handleChange} />
          <label className="block text-lg font-medium">Is Paid</label>
        </div>

        {formData.isPaid && (
          <div className="mb-4">
            <label className="block text-lg font-medium">Ticket Price</label>
            <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-lg font-medium">Attendee Capacity</label>
          <input type="number" name="attendeeCapacity" value={formData.attendeeCapacity} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">Upload Poster</label>
          <input type="file" accept="image/*" name="poster" onChange={handleImageChange} className="w-full p-2 border rounded" required />
          {formData.poster && <img src={formData.poster} alt="Preview" className="w-auto h-[200px] mt-2" />}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <button type="submit" className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? "opacity-50" : ""}`} disabled={loading}>
          {loading ? "Posting..." : "Post Event"}
        </button>
      </form>
    </div>
  );
};

export default PostEvent;

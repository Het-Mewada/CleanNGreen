import React, { useState } from "react";
import axios from "axios";
const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    endDate: "",
    location: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    image: "",
    organizer: "",
    organizerEmail: "",
    maxAttendees: "",
    ticketPrice: "",
    categories: [],
    registrationDeadline: "",
    isFeatured: false,
    status: "Draft",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested address object
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    }
    // Handle categories and tags
    else if (name === "categories" || name === "tags") {
      const items = value.split(",").map((item) => item.trim());
      setFormData((prev) => ({ ...prev, [name]: items }));
    }
    // Handle checkbox
    else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    }
    // Handle other fields
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      console.log(`${__API_URL__}/admin/events/add`)
      const { data } = await axios.post(
        `${__API_URL__}/admin/events/add`,
        formData,
        { 
          withCredentials: true, 
          headers: { Authorization: `Bearer ${token}` }
         }
      );

      if (data.success) {
        alert("Event created successfully!");
      } else {
        alert(data.message || "Something went wrong");
        console.log(data)
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 my-27 bg-white rounded-2xl shadow-md space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Create New Event
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="datetime-local"
          name="date"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="datetime-local"
          name="endDate"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      {/* Address Fields */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="address.street"
          placeholder="Street"
          onChange={handleChange}
          className="col-span-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          name="address.city"
          placeholder="City"
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          name="address.state"
          placeholder="State"
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          name="address.zipCode"
          placeholder="Zip Code"
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          name="address.country"
          placeholder="Country"
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <input
        type="text"
        name="organizer"
        placeholder="Organizer"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <input
        type="email"
        name="organizerEmail"
        placeholder="Organizer Email"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="maxAttendees"
          placeholder="Max Attendees"
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="number"
          name="ticketPrice"
          placeholder="Ticket Price"
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <input
        type="text"
        name="categories"
        placeholder="Categories (comma-separated)"
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <input
        type="datetime-local"
        name="registrationDeadline"
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isFeatured"
          onChange={handleChange}
          className="h-4 w-4 text-teal-600 border-gray-300 rounded"
        />
        <span className="text-gray-700">Featured Event</span>
      </label>

      <select
        name="status"
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-all duration-200"
      >
        Create Event
      </button>
    </form>
  );
};

export default EventForm;

import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";

const NeedHelpForm = () => {
  const [hasShownToast, setHasShownToast] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  if (!token && !hasShownToast) {
    toast.error("Login to use this feature ");
    setHasShownToast(true);
  }
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    phone: "",
    subject: "",
    message: "",
    preferredContact: "email",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Login to send Help Request ");
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("FormData", formData);
      // Replace with your actual API endpoint
      await axios.post(`${__API_URL__}/users/help/submit-req`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubmitSuccess(true);
      toast.success("Requset Sent sucessfully")
      setFormData({
        name: user.name,
        email: user.email,
        phone: "",
        subject: "",
        message: "",
        preferredContact: "email",
      });
    } catch (err) {
      toast.error(err.message);
      console.error("Error submitting help request:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>

        <div
          style={{
            maxWidth: "80%",
          }}
          className=" mx-auto mt-33 mb-24 p-8 bg-white/30 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-green-700 mb-2 text-center">
            We're Here to Help!
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Fill out the form below, and our team will be in touch with you
            shortly.
          </p>

          <form onSubmit={handleSubmit} className="">
            <div className="flex gap-5">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      disabled
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      disabled
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Phone Number{" "}
                    {(formData.preferredContact === "phone" ||
                      formData.preferredContact === "whatsapp") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    required={
                      formData.preferredContact === "phone" ||
                      formData.preferredContact === "whatsapp"
                    }
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="waste-collection">Waste Collection</option>
                    <option value="recycling">Recycling</option>
                    <option value="composting">Composting</option>
                    <option value="volunteering">Volunteering</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Preferred Contact Method
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {["email", "phone", "whatsapp"].map((method) => (
                      <label key={method} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          checked={formData.preferredContact === method}
                          onChange={handleChange}
                          className="text-green-600 focus:ring-green-500"
                        />
                        <span className="capitalize">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 mt-3 rounded-full text-white font-semibold text-lg shadow-lg ${
                isSubmitting
                  ? "bg-green-400"
                  : "bg-green-600 hover:bg-green-700"
              } transition`}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
    </>
  );
};

export default NeedHelpForm;

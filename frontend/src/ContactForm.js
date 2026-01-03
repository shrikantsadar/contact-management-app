import { useState } from "react";
import axios from "axios";

function ContactForm({ onContactAdded }) {   // 🔄 rename prop
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid =
    formData.name && formData.email && formData.phone;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://contact-management-backend-nnw3.onrender.com/api/contacts",
        formData
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      onContactAdded(); // ✅ triggers re-fetch in App.js
    } catch (error) {
      console.error(error);
      alert("Error saving contact");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Contact</h2>

      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="email"  name="email"  placeholder="Email"  value={formData.email}  onChange={handleChange} pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required/>
     <input type="tel" name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setFormData({ ...formData, phone: value });
    }
  }}
  pattern="[0-9]{10}"
  required
/>

      <textarea name="message" placeholder="Message (optional)" value={formData.message} onChange={handleChange} />

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
}

export default ContactForm;

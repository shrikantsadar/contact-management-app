import { useState } from "react";
import axios from "axios";

function ContactForm({ onContactAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Generic handler (name, email, message)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Phone handler (ONLY 10 DIGITS)
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // digits only

    if (value.length <= 10) {
      setFormData({ ...formData, phone: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Final validation (VERY IMPORTANT)
    if (formData.phone.length !== 10) {
      setStatus("Phone number must be exactly 10 digits");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    try {
      await axios.post(
        "https://contact-management-backend-nnw3.onrender.com/api/contacts",
        formData
      );

      setStatus("Contact added successfully");
      setFormData({ name: "", email: "", phone: "", message: "" });
      onContactAdded();

      setTimeout(() => setStatus(""), 3000);
    } catch {
      setStatus("Error adding contact");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <>
      {status && <div className="status success">{status}</div>}

      <form onSubmit={handleSubmit}>
        <h2>Add Contact</h2>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone (10 digits)"
          value={formData.phone}
          onChange={handlePhoneChange}
          maxLength="10"
          required
        />

        <textarea
          name="message"
          placeholder="Message (optional)"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default ContactForm;

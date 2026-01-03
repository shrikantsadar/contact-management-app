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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone (10 digits)"
          value={formData.phone}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            if (val.length <= 10) setFormData({ ...formData, phone: val });
          }}
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

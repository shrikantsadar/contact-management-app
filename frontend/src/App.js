import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        "https://contact-management-backend-nnw3.onrender.com/api/contacts"
      );
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="app-container">
      <div className="app-header">
        <img src="/logo.png" alt="Logo" className="app-logo" />
        <h1>Contact Management App</h1>
      </div>

      <ContactForm onContactAdded={fetchContacts} />
      <ContactList contacts={contacts} onContactChange={fetchContacts} />
    </div>
  );
}

export default App;

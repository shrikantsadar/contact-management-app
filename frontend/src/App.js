import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "https://contact-management-backend-nnw3.onrender.com/api/contacts"
      );
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="app-container">
      <h1>Contact Management App</h1>

      <ContactForm onContactAdded={fetchContacts} />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;

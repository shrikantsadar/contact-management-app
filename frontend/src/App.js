import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const filteredContacts = contacts
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className="app-container">
      <h1>Contact Management App</h1>

      <input
        className="search-input"
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ContactForm onContactAdded={fetchContacts} />

      <ContactList
        contacts={filteredContacts}
        onContactChange={fetchContacts}
      />
      <button
        className="sort-btn"
        onClick={() =>
          setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        }
      >
        Sort by Name ({sortOrder === "asc" ? "A–Z" : "Z–A"})
      </button>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import axios from "axios";

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/contacts"
      );
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Submitted Contacts</h2>

      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id} className="contact-item">
              <strong>{contact.name}</strong> <br />
              {contact.email} <br />
              {contact.phone} <br />
              {contact.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;

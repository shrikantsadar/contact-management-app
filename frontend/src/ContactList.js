import { useState } from "react";
import axios from "axios";

function ContactList({ contacts, onContactChange }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const startEdit = (contact) => {
    setEditingId(contact._id);
    setEditData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message || "",
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(
        `https://contact-management-backend-nnw3.onrender.com/api/contacts/${id}`,
        editData
      );
      setEditingId(null);
      onContactChange();
    } catch (error) {
      alert("Error updating contact");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    try {
      await axios.delete(
        `https://contact-management-backend-nnw3.onrender.com/api/contacts/${id}`
      );
      onContactChange();
    } catch (error) {
      alert("Error deleting contact");
    }
  };

  return (
    <div className="contact-list">
      <h2>Submitted Contacts</h2>

      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <ul>
          {contacts.map((c) => (
            <li key={c._id} className="contact-card">
              {editingId === c._id ? (
                <>
                  <input name="name" value={editData.name} onChange={handleEditChange} />
                  <input name="email" value={editData.email} onChange={handleEditChange} />
                  <input name="phone" value={editData.phone} onChange={handleEditChange} />
                  <textarea name="message" value={editData.message} onChange={handleEditChange} />

                  <button onClick={() => saveEdit(c._id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {c.name}</p>
                  <p><strong>Email:</strong> {c.email}</p>
                  <p><strong>Phone:</strong> {c.phone}</p>
                  {c.message && <p><strong>Message:</strong> {c.message}</p>}

                  <button onClick={() => startEdit(c)}>Edit</button>
                  <button onClick={() => handleDelete(c._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;

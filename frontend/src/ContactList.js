import { useState } from "react";
import axios from "axios";

function ContactList({ contacts, onContactChange }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [status, setStatus] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const sortedContacts = [...contacts].sort((a, b) =>
    sortAsc
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const startEdit = (c) => {
    setEditingId(c._id);
    setEditData(c);
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(
        `https://contact-management-backend-nnw3.onrender.com/api/contacts/${id}`,
        editData
      );
      setEditingId(null);
      setStatus("Contact updated successfully");
      onContactChange();
      setTimeout(() => setStatus(""), 3000);
    } catch {
      setStatus("Error updating contact");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    try {
      await axios.delete(
        `https://contact-management-backend-nnw3.onrender.com/api/contacts/${id}`
      );
      setStatus("Contact deleted successfully");
      onContactChange();
      setTimeout(() => setStatus(""), 3000);
    } catch {
      setStatus("Error deleting contact");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="contact-list">
      <h2>Submitted Contacts</h2>

      {status && <div className="status success">{status}</div>}

      {sortedContacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <>
          <ul>
            {sortedContacts.map((c) => (
              <li key={c._id} className="contact-card">
                {editingId === c._id ? (
                  <>
                    <input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                    <input
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                    <input
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                    />
                    <textarea
                      value={editData.message}
                      onChange={(e) =>
                        setEditData({ ...editData, message: e.target.value })
                      }
                    />

                    <button onClick={() => saveEdit(c._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <p><strong>Name:</strong> {c.name}</p>
                    <p><strong>Email:</strong> {c.email}</p>
                    <p><strong>Phone:</strong> {c.phone}</p>
                    {c.message && (
                      <p><strong>Message:</strong> {c.message}</p>
                    )}

                    <button onClick={() => startEdit(c)}>Edit</button>
                    <button onClick={() => deleteContact(c._id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>

       
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={() => setSortAsc(!sortAsc)}>
              Sort by Name ({sortAsc ? "A → Z" : "Z → A"})
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ContactList;

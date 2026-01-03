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
    setEditData({ ...c }); // clone object
  };

  // 🔒 Phone handler for EDIT (10 digits only)
  const handleEditPhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // digits only

    if (value.length <= 10) {
      setEditData({ ...editData, phone: value });
    }
  };

  const saveEdit = async (id) => {
    // 🔒 Final validation before update
    if (!/^\d{10}$/.test(editData.phone)) {
      setStatus("Phone number must be exactly 10 digits");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

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
                      type="text"
                      value={editData.phone}
                      onChange={handleEditPhoneChange}
                      maxLength="10"
                      placeholder="10-digit phone"
                    />
                    <textarea
                      value={editData.message || ""}
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

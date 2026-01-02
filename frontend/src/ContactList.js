function ContactList({ contacts }) {
  return (
    <div>
      <h2>Submitted Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <ul>
          {contacts.map((c) => (
            <li key={c._id}>
              <strong>{c.name}</strong><br />
              {c.email}<br />
              {c.phone}<br />
              {c.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;

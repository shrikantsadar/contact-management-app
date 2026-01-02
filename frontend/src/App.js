import { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="app-container">
      <h1>Contact Management App</h1>
      <ContactForm onSuccess={() => setRefresh(!refresh)} />
      <ContactList refresh={refresh} />
    </div>
  );
}

export default App;

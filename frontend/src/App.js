import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

function App() {
  return (
    <div className="app-container">
      <h1>Contact Management App</h1>
      <ContactForm />
      <ContactList />
    </div>
  );
}

export default App;

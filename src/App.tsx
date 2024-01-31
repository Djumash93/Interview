import "./App.css";
import Applications from "./Applications";
import { CreateApplicationForm } from "./CreateApplicationForm/CreateApplicationForm";
import Header from "./Header";
import { ApplicationProvider } from "./context/ApplicationsContext";
function App() {
  return (
    <div className="App">
      <ApplicationProvider>
        <Header />
        <Applications />
        <CreateApplicationForm />
      </ApplicationProvider>
    </div>
  );
}

export default App;

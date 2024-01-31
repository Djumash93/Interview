import { useState } from "react";
import { createDb } from "../json-server/db";
import "./App.css";
import Applications from "./Applications";
import { CreateApplicationForm } from "./CreateApplicationForm/CreateApplicationForm";
import Header from "./Header";
import { Button } from "./ui/Button/Button";

function App() {
  return (
    <div className="App">
      \ <Header />
      <Applications />
      <CreateApplicationForm />
      {/* <Button className={"button"} onClick={() => createDb()}>
        Load More
      </Button> */}
    </div>
  );
}

export default App;

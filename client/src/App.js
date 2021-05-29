import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function App() {
  const [name, setName] = useState();

  useEffect(() => {
    fetch("/user")
      .then((res) => res.json())
      .then((account) => setName(account.name));
  }, []);

  return <HomePage name={name} />;
}

export default App;

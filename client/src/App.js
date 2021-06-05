import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import axios from "axios";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function App() {
  const [name, setName] = useState();

  useEffect(() => {
    axios.get("/user").then((account) => setName(account.data.name));
  }, []);

  return <HomePage name={name} />;
}

export default App;

// useEffect(() => {
//   fetch("/user")
//     .then((res) => res.json())
//     .then((account) => setName(account.name));
// }, []);

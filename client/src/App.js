import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return <LoginPage />;
}

export default App;

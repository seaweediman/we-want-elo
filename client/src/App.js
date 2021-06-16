import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home } from "./components";
import CreateListing from "./pages/CreateListing";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/CreateListing" exact component={() => <CreateListing />} />
          <Route path="/LoginPage" exact component={() => <LoginPage />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

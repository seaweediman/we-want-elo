import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home } from "./components";
import CreateListing from "./pages/CreateListing";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import LogoutPage from "./pages/LogoutPage";
import AllListings from "./pages/AllListings";
import About from "./pages/About";
import UserSearch from "./pages/UserSearch";
import UpdateListing from "./pages/UpdateListing";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/CreateListing" exact component={CreateListing} />
          <Route path="/LoginPage" exact component={LoginPage} />
          <Route path="/LogoutPage" exact component={LogoutPage} />
          <Route path="/ProfilePage/:id" exact component={ProfilePage} />
          <Route path="/AllListings" exact component={AllListings} />
          <Route path="/About" exact component={About} />
          <Route path="/UserSearch" exact component={UserSearch} />
          <Route path="/UpdateListing/:id" exact component={UpdateListing} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

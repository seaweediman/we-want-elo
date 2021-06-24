import './App.css';
import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home } from "./components";
import CreateListing from "./pages/CreateListing";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import LogoutPage from "./pages/LogoutPage";
import AllListings from "./pages/AllListings";
import OtherUserProfile from "./pages/OtherUserProfile";
import { CSSTransition } from 'react-transition-group';


function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/CreateListing" exact component={() => <CreateListing />} />
          <Route path="/LoginPage" exact component={() => <LoginPage />} />
          <Route path="/LogoutPage" exact component={() => <LogoutPage />} />
          <Route path="/ProfilePage" exact component={() => <ProfilePage />} />
          <Route path="/AllListings" exact component={() => <AllListings />} />
          <Route path="/OtherUserProfile" exact component={() => <OtherUserProfile />} />

        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

// function App() {
//   return (
//   <Navbar>
//   <NavItem icon="hi"></NavItem>
//   <NavItem icon="hi1"></NavItem>
//   <NavItem icon="hi2"></NavItem>

//   <NavItem icon="hi3">
//     <DropdownMenu></DropdownMenu>
//   </NavItem>
// </Navbar>
//   )
// }


function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem>
            Settings
          </DropdownItem>
          <DropdownItem>
            Animals
          </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem>HTML</DropdownItem>
          <DropdownItem>CSS</DropdownItem>
          <DropdownItem>JavaScript</DropdownItem>
          <DropdownItem>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
export default App;

import './General.css';
import React from "react";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <Link className="footer" to='/About'>
          By GGEZ

    </Link>
  );
}

export default Footer;
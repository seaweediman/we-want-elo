import './Pages.css';
import React from "react";

function LoginPage() {
  return (
    <div class='loginStatus'>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <p>Status: Not logged in</p>
      <p>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      
        <a href="http://localhost:3001/auth/steam">Sign On with Steam</a>
      </p>
    </div>
  );
}

export default LoginPage;
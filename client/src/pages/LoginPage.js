import React from 'react';

function LoginPage() {
  return (
    <div>
      <p>Not logged in</p>
      <button onClick = {() => fetch("/auth/steam")}> Sign in with Steam </button>
    </div>
  );
}

export default LoginPage;

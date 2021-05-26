import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div class="container-center-horizontal">
      <div class="homepage screen">
        <img
          class="gamer"
          src="https://anima-uploads.s3.amazonaws.com/projects/60adfd5bf3283a74a338dba5/releases/60ae0079c8124c55f90dc022/img/gamer@1x.png"
        />
        <div class="flex-col">
          <h1 class="text-1">
            MATCH UP
            <br />
            <br />
            WIN MORE
            <br />
            <br />
            HAVE FUN
          </h1>
          <div class="group-1">
            <div class="overlap-group">
              <div class="login">LOGIN</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>{!data ? "Loading..." : data}</p>
//     </header>
//   </div>
// );

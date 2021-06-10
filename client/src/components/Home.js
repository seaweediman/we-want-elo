import React from "react";

function Home(props) {
  const { name } = props;
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
            HAVE FUN {name}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;

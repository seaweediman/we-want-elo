import Home from "../components/Home";

function HomePage(props) {
  const { name } = props;
  return (
    <div>
      <Home name={name} />
    </div>
  );
}

export default HomePage;

import "./App.css";
import Routing from "./routing/Routing";
import PlacesList from "./components/cards/placeList";
import Register from "./components/auth/Register";

function App() {
  return (
    <>
      <Routing />
      <PlacesList />
    </>
  );
}

export default App;

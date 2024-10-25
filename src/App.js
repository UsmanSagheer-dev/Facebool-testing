import { Provider } from "react-redux";
import store from "./store/Store";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navigation />

      </Provider>
    </>
  );
}

export default App;

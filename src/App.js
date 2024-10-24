import logo from "./logo.svg";
import "./App.css";
import { Box } from "@mui/material";

import { Provider } from "react-redux";
import store from "./store/Store";
import Navigation from "./components/navigation/Navigation";
function App() {
  return (
    <>
      <Box>
        <Provider store={store}>
         <Navigation/>
        </Provider>
      </Box>
    </>
  );
}

export default App;

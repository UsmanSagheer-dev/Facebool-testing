import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./store/Store";
import { initializeUser } from './store/slices/authslice'; 
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeUser(dispatch);
  }, [dispatch]);

  return (
    <>
      <Navigation />

    </>
  );
}

export default App;

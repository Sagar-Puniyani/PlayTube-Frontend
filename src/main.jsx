import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
 

createRoot(document.getElementById("root")).render(
  <Provider store={store} >
    <BrowserRouter>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
    </BrowserRouter>
  </Provider>
  
);

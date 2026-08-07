import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

import App from "./App";

import { initPersistor, store } from "./app/store";

import "./index.css";
import "./styles/variables.css";
import "./styles/scrollbar.css";

const persistor = initPersistor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <App />

          <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

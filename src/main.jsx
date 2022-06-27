import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// useContext
const info = {
  name: "Salmon",
  id: 123,
};
export const InfoContext = createContext(info);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InfoContext.Provider value={info}>
      <App />
    </InfoContext.Provider>
  </React.StrictMode>
);

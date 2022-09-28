import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Auth from "./Auth";
import { AppProvider } from "@shopify/polaris";
import './App.css';
function App() {
  return (
    <>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AppProvider>
      ,
    </>
  );
}
export default App;

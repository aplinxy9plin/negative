import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./context/Context";

// screens
import Login from "./screens/Login";
import Main from "./screens/Main";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;

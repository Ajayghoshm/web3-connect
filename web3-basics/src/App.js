import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./Dashboard/Contact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </div>
  );
}

export default App;

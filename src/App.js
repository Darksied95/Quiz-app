import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom"
import Questions from './components/Questions';


import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/questions" element={<Questions />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;

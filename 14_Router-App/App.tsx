import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouterApp from "./projects/14_Router-App/RouterApp"
import NotFound from "./projects/14_Router-App/NotFound"
import Navbar from "./projects/14_Router-App/Navbar"
//
import Theme from "./projects/11_Theme/Theme"
import WindowSize from "./projects/12_Window-Size/WindowSize"




function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<RouterApp />} />
        <Route path="/projects/11" element={<Theme />} />
        <Route path="/projects/12" element={<WindowSize />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

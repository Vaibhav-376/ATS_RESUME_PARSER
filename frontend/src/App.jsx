import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/templates/About';
import Contact from './components/templates/Contact';
import GettingResume from './components/GettingResume';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/extractedResume' element={<GettingResume/>}/>
      </Routes>
    </Router>
  );
};

export default App;

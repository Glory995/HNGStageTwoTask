import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Details from './pages/details';
import Footer from './pages/footer';

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<Details />} />
        </Routes>
        <Footer /> {/* Show the Footer */}
      </>
    </BrowserRouter>
  );
}

export default App;

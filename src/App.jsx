import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/UI/Layout';
import Home from './pages/Home';
import PlanetExplorer from './pages/PlanetExplorer';
import SpaceChat from './pages/SpaceChat';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<PlanetExplorer />} />
          <Route path="/chat" element={<SpaceChat />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

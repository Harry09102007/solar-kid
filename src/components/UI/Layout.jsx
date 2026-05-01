import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Navbar />
      <main style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

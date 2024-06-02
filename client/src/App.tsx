import React from 'react';
import BlogGenerator from './components/BlogGenerator';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className="bg-[#E3E5DE] h-screen">
      <Navbar />
      <BlogGenerator />
    </div>
  );
};

export default App;
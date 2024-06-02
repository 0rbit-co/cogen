import React from 'react';
import BlogGenerator from './components/BlogGenerator';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-[#E3E5DE] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <BlogGenerator />
      </div>
      <Footer />
    </div>
  );
};

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Home = () => {
  return (
    <div className="container text-center">
      <h1 className="mt-72 font-heebo text-6xl mb-10">Re:Shop המנהל של</h1>
      <img src={logo} alt="Reshop Manager Logo" className="w-48 h-48 mb-10 rounded-full object-cover mx-auto" />
      <div className="flex justify-center space-x-4">
        <Link to="/choose-items-to-print" className="btn btn-active btn-secondary w-36">
          להדפסה
        </Link>
        <Link to="/add-item" className="btn btn-active btn-secondary w-36">
          פריט חדש
        </Link>
        <Link to="/items" className="btn btn-active btn-secondary w-36">
          כל הפריטים
        </Link>
      </div>
    </div>
  );
};

export default Home;

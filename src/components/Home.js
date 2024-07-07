import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Home = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
    <div className=" text-center flex justify-center items-center align-middle flex-col mx-auto">
      <h1 className="font-heebo text-6xl mb-10">Re:Shop המנהל של</h1>
      <img src={logo} alt="Reshop Manager Logo" className="w-48 h-48 mb-10 rounded-full object-cover mx-auto" />
      <div className="flex justify-center gap-2">
        <Link
        
        to="/choose-items-to-print" className="btn btn-active  btn-secondary w-26 md:w-36 bg-[#ccc] hover:bg-slate-200 text-white border border-[#ccc] hover:border-[#ccc]">
          להדפסה
        </Link>
        <Link
        
        to="/add-item" className="btn btn-active btn-secondary w-26 md:w-36 bg-[#ccc] hover:bg-slate-200 text-white border border-[#ccc] hover:border-[#ccc]">
          פריט חדש
        </Link>
        <Link
        to="/items" className="btn btn-active btn-secondary w-26 md:w-36 bg-[#ccc] hover:bg-slate-200 text-white border border-[#ccc] hover:border-[#ccc]">
          כל הפריטים
        </Link>
      </div>
    </div>
    </div>

  );
};

export default Home;

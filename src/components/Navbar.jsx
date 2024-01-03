import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { SiAbstract } from 'react-icons/si';
import { FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const auth = getAuth();



  return (
    <div className="navbar bg-base-100 shadow fixed top-0 left-0 w-full z-10">
     <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <Link to="/home">
          <li>
            <a>Home</a>
          </li>
        </Link>
        <Link to="/groups">
          <li>
            <a>Groups</a>
          </li>
        </Link>
        <Link to="/disclaimer">
          <li>
            <a>Disclaimer</a>
          </li>
        </Link>
        <Link to="/about">
          <li>
            <a>About</a>
          </li>
        </Link>
        
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Index...arrr</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    
    <Link to="/home">
          <li>
            <a>Home</a>
          </li>
        </Link>
        <Link to="/groups">
          <li>
            <a>Groups</a>
          </li>
        </Link>
        <Link to="/disclaimer">
          <li>
            <a>Disclaimer</a>
          </li>
        </Link>
        <Link to="/about">
          <li>
            <a>About</a>
          </li>
        </Link>
    </ul>
  </div>
  <div className="navbar-end">
  
  </div>
</div>
      

        

    </div>
  );
}

export default Navbar;

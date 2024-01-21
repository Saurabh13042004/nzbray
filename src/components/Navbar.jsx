import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { SiAbstract } from 'react-icons/si';
import { FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const uid = auth.currentUser ? auth.currentUser.uid : null;



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
    {
      uid ? (
        <Link className='btn btn-base-200 mx-2 ' to='/profile'> Profile </Link>

      ) : (
        <Link className='btn btn-base-200 mx-2 ' to='/register'> Register </Link>
      )
    }
    
  <div className="dropdown">
  <div tabIndex={0} role="button" className="btn m-1">
    Theme
    <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
  </div>
  <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default"/></li>
    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro"/></li>
    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value="cyberpunk"/></li>
    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine"/></li>
    <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" value="aqua"/></li>
  </ul>
</div>
  </div>
</div>
      

        

    </div>
  );
}

export default Navbar;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { SiAbstract } from 'react-icons/si';
import { FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.');
        navigate('/signin');
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow fixed top-0 left-0 w-full z-10">
      <div className="navbar-start">
        <div className="btn btn-ghost font-bold text-2xl flex items-center">
          <SiAbstract className="mr-2" />
          Index...arrr
        </div>
      </div>
      {user && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-4">
            <Link to="/home">
              <li>
                <a className="text-lg font-semibold">Home</a>
              </li>
            </Link>
            <Link to="/groups">
              <li>
                <a className="text-lg font-semibold">Groups</a>
              </li>
            </Link>
            <Link to="/disclaimer">
              <li>
                <a className="text-lg font-semibold">Disclaimer</a>
              </li>
            </Link>
            <Link to="/about">
              <li>
                <a className="text-lg font-semibold">About</a>
              </li>
            </Link>
          </ul>
        </div>
      )}
      <div className="w-[35%] justify-end ml-auto">
      <label className="cursor-pointer grid place-items-center">
            <input
              type="checkbox"
              value="dark"
              className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
            />
            <svg
              className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
      </div>
      
      {user && (
        <div className="w-[15%] justify-end">
          <button onClick={handleSignOut} className="btn flex items-center">
            <FaSignOutAlt className="mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;

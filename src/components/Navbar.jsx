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
          NZBRay
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
      {user && (
        <div className="navbar-end">
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

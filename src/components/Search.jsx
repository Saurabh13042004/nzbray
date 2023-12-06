import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`https://nzbray-data.onrender.com/search?q=${searchTerm}`);

      // Navigate to the search results page with the query parameter
      navigate(`/search?q=${searchTerm}`);
    } catch (error) {
      console.error('Error during search:', error);
      toast.error('Error during search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!user ? (
        <div className="flex items-center justify-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="w-full max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-teal-500"
          >
            Search for NZBs
          </motion.div>

          <form onSubmit={handleSearch} className="w-full">
            <div className="flex items-center rounded-full border-2 border-teal-500 overflow-hidden">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 px-6 py-3 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter your search term..."
                aria-label="Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-sm text-white px-6 py-3"
                type="submit"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FaSearch size={20} />
                )}
              </button>
            </div>
          </form>

          <ToastContainer />

          {loading && (
            <div className="mt-6">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

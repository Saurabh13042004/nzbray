import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {auth} from '../firebase';
import { FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const userID = auth.currentUser.uid;

  const navigate = useNavigate();

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
    <div className="flex flex-col items-center justify-center h-screen">
      {userID === null ? (<span className="loading loading-spinner loading-lg"></span>) : (
        <div>
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-3xl font-bold text-center"
      >
        Search for NZBs
      </motion.div>

      <form onSubmit={handleSearch} className="w-full max-w-md">
        <div className="flex items-center rounded-xl border-2 border-teal-500 overflow-hidden">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 px-4 py-3 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter your search term..."
            aria-label="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-sm text-white px-4 py-3"
            type="submit"
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : (<FaSearch  size={20}/>  )}
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

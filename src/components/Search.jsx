import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [filetypes, setFiletypes] = useState('');
  const [group, setGroup] = useState('');
  const [poster, setPoster] = useState('');
  const [sortOrder, setSortOrder] = useState('Date');

  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('https://nzbray-data.onrender.com/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
        toast.error('Error fetching groups. Please try again.');
      }
    };

    fetchGroups();
  }, []);

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
      const response = await axios.get(`https://nzbray-data.onrender.com/search?q=${searchTerm}&ft=${filetypes}&gr=${group}&po=${poster}&so=${sortOrder}`);

      // Navigate to the search results page with the query parameter
      navigate(`/search?q=${searchTerm}&ft=${filetypes}&gr=${group}&po=${poster}&so=${sortOrder}`);
    } catch (error) {
      console.error('Error during search:', error);
      toast.error('Error during search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearchClick = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
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
            <div className="flex items-center rounded-full border-2 border-teal-500 overflow-hidden mb-4">
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

          <button
            onClick={handleAdvancedSearchClick}
            className="bg-teal-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-teal-700"
          >
            {showAdvancedSearch ? 'Hide Advanced Search' : 'Show Advanced Search'}
          </button>

          {showAdvancedSearch && (
            <form className="w-[700px] mb-4">
              <div className="flex flex-wrap items-center mb-4">
                <label htmlFor="filetypes" className="block text-gray-700 text-sm font-bold mb-2 mr-2">
                  Filetypes:
                </label>
                <div className="flex items-center">
                  <select
                    id="filetypes"
                    name="filetypes"
                    className="input w-full max-w-xs"
                    value={filetypes}
                    onChange={(e) => setFiletypes(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="au">Audio</option>
                    <option value="vi">Video</option>
                    <option value="im">Image</option>
                    <option value="ap">App</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <label htmlFor="group" className="block text-gray-700 text-sm font-bold mb-2 mr-2">
                  Group:
                </label>
                <select
                  id="group"
                  name="group"
                  className="input w-full max-w-xs"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                >
                  <option value="">All</option>
                  {groups.map((group) => (
                    <option key={group.name} value={group.name}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="poster" className="block text-gray-700 text-sm font-bold mb-2 mr-2">
                  Poster:
                </label>
                <input
                  id="poster"
                  type="text"
                  placeholder="Type the name of poster"
                  className="input w-full max-w-xs"
                  value={poster}
                  onChange={(e) => setPoster(e.target.value)}
                />
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="sortOrder" className="block text-gray-700 text-sm font-bold mb-2 mr-2">
                  Sort Order:
                </label>
                <select
                  id="sortOrder"
                  name="sortOrder"
                  className="input w-full max-w-xs"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="Date">Date</option>
                  <option value="s">Size</option>
                  <option value="m">Magic</option>
                </select>
              </div>
            </form>
          )}

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

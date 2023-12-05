import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const handleSearch = async () => {
    setLoading(true);
    if (searchTerm.trim() === '') {
      toast.error('Please enter a valid group name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/groups/search?q=${searchTerm}`);
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
      toast.error('Error fetching groups. Please try again.');
    }
    setLoading(false);
  };

  const handleBrowseAllGroups = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/groups/all?page=${currentPage}`);
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching all groups:', error);
      toast.error('Error fetching all groups. Please try again.');
    }
    setLoading(false);
  };

  const handleBrowsePopularGroups = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/groups/popular?page=${currentPage}`);
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching popular groups:', error);
      toast.error('Error fetching popular groups. Please try again.');
    }
    setLoading(false);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/groups/all?page=${currentPage}`);
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
        toast.error('Error fetching groups. Please try again.');
      } finally {
        setLoading(false);
      }
      setLoading(false);
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="p-12 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-4">Browse Groups</h2>
      <p className="text-gray-600 mb-2">Search for a group</p>
      <div className="flex mb-4">
        <input
          type="text"
          className="input input-bordered input-primary w-full max-w-xs me-3"
          placeholder="Enter the group name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          <FaSearch className="mr-1" />
          Search
        </button>
      </div>

      <p className="text-gray-600 mb-2 m-3">Or</p>
      <div className="flex">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary"
          onClick={handleBrowseAllGroups}
        >
          Browse All Groups
        </motion.button>
        <p className="text-gray-600 mb-2 m-3">Or</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary"
          onClick={handleBrowsePopularGroups}
        >
          Browse Popular Groups
        </motion.button>
      </div>

      <div className="overflow-x-auto mt-4">
        {loading && (
          <div className="flex items-center justify-center ">
           <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {!loading && groups.length === 0 && (
          <p className="text-gray-600">No groups found.</p>
        )}

        {!loading && groups.length > 0 && (
          <table className="table w-full my-4">
            <thead>
              <tr>
                <th className="text-left">S.No.</th>
                <th className="text-left">Group name</th>
                <th className="text-left">Last Post Date</th>
                <th className="text-left">Last Scan Date</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={group.name}>
                  <td className="text-left">{index + 1 + currentPage * 10}</td>
                  <td className="text-left">{group.name}</td>
                  <td className="text-left">{group.last_update}</td>
                  <td className="text-left">{group.last_scan_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        {currentPage > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary"
            onClick={handlePrevPage}
          >
            Previous Page
          </motion.button>
        )}
        {!loading && groups.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary"
            onClick={handleNextPage}
          >
            Next Page
          </motion.button>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Groups;

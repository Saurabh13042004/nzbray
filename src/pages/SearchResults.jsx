// searchresults.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { FaDownload, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  const ft = searchParams.get('ft');
  const gr = searchParams.get('gr');
  const po = searchParams.get('po');
  const so = searchParams.get('so');

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/search?q=${query}&page=${currentPage}&ft=${ft}&gr=${gr}&po=${po}&so=${so}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage, ft, gr, po, so]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return prevPage + 1;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return Math.max(prevPage - 1, 1);
    });
  };

  const handleDownload = (nzbId) => {
    try {
      const link = document.createElement('a');
      link.href = `http://localhost:3001/nzb/${nzbId}`;
      link.download = `${nzbId}.nzb`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error during download:', error);
      toast.error('Error during download. Please try again.');
    }
  };

  return (
    <div className="p-4 lg:p-12">
      <Link to="/home" className="text-xl text-blue-500 mb-4 block flex items-center">
        <FaHome className="mr-2" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-semibold mb-4">Search Results for "{query}"</h1>

      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}

      {!loading && searchResults.length === 0 && (
        <p>No search results found.</p>
      )}

      {!loading && searchResults.length > 0 && (
        <div>
          {searchResults.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="my-4 w-[80%] mx-auto bg-base-100 shadow-xl p-4 relative  transition-all duration-300"
            >
              <div className="card-body">
                <Link 
                  to={`/post-details/${result.nzbId}`}
                 className="card-title text-lg font-semibold">{result.title
                  .replace('yEnc', '')
                  .replace('NZB', '')
                  .replace('⬇', '')
                  .replace('NFO', '\n')}</Link>
                <p><span className='font-semibold'>Group Name : </span>{result.grp}</p>
                <p><span className='font-semibold'>Poster : </span>{result.poster}</p>
                <p><span className='font-semibold'>NZBId : </span>{result.nzbId}</p>
              </div>

              {/* Circular download icon */}
              <div className="absolute bottom-4 right-4">
                <button
                  className="btn btn-primary rounded-full hover:shadow-md transition-all duration-300"
                  onClick={() => handleDownload(result.nzbId)}
                >
                  <FaDownload size={18}/> Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            className="btn btn-secondary"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            className="btn btn-secondary"
            disabled={searchResults.length < 50} // Assuming 50 results per page
          >
            Next
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default SearchResults;

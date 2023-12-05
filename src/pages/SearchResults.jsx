import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://nzbray-data.onrender.com/search?q=${query}&page=${currentPage}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

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
    // Implement your download logic here
    window.open(`https://nzbray-data.onrender.com/nzb/${nzbId}`, '_blank');
    console.log(`Downloading NZB with ID: ${nzbId}`);
  };

  return (
    <div className="p-4 lg:p-12">
      <Link to="/home" className="text-xl text-blue-500 mb-4 block">
        Back to Home
      </Link>
      <h1 className="text-3xl font-semibold mb-4">Search Results for "{query}"</h1>

      {loading && (
        <span className="loading loading-spinner loading-lg"></span>
      )}

      {!loading && searchResults.length === 0 && (
        <p>No search results found.</p>
      )}

      {!loading && searchResults.length > 0 && (
        <div>
          {searchResults.map((result, index) => (
            <div key={index} className="my-4 bg-base-100 shadow-xl p-4 relative">
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold">{result.title}</h2>
                <p><span className='font-semibold'>Group Name : </span>{result.grp}</p>
                <p><span className='font-semibold'>Poster : </span>{result.poster}</p>
                <p><span className='font-semibold'>NZBId : </span>{result.nzbId}</p>
              </div>

              {/* Circular download icon */}
              <div className="absolute bottom-4 right-4">
                <button
                  className="btn btn-primary  rounded-full"
                  onClick={() => handleDownload(result.nzbId)}
                >
                  <FaDownload  size={18}/>
                </button>
              </div>
            </div>
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
    </div>
  );
}

export default SearchResults;

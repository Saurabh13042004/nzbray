// GroupDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaDownload, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const convertBytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (bytes === 0) return '0 Byte';

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

  return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + ' ' + sizes[i];
};
const handleDownload = (nzbId) => {
    try {
      const link = document.createElement('a');
      link.href = `https://nzbray-data.onrender.com/nzb/${nzbId}`;
      link.download = `${nzbId}.nzb`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error during download:', error);
      toast.error('Error during download. Please try again.');
    }
  };

const GroupDetails = () => {
  const params = useParams();
  const groupName = params.groupName;
  const [groupDetails, setGroupDetails] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`https://nzbray-data.onrender.com/group/${groupName}`);
        setGroupDetails(response.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [groupName]);

  if (!groupDetails) {
    return (
      <div className='p-7 text-center'>
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-12 container mx-auto">
      <h1 className="text-3xl font-semibold mb-4 p-5 mx-auto text-center"> All Posts from "{groupName}"</h1>

      <div className="grid gap-5">
        {groupDetails.map((detail, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-base-100 w-[75%] mx-auto shadow-xl p-4 relative  transition-all duration-300 mb-6"
          >
            <div className="card-body">
              <h2 className="text-lg font-semibold mb-2">{detail.title}</h2>
              <p><span className='font-semibold'>Poster: </span>{detail.poster}</p>
              <p><span className='font-semibold'>Group: </span>{detail.groups}</p>
              <p><span className='font-semibold'>Age: </span>{detail.age}</p>
            </div>
            <div className="absolute bottom-4 right-4 grid gap-3 space-y-2">
              <button  className="btn btn-primary rounded-full hover:shadow-md transition-all duration-300"  onClick={() => handleDownload(detail.nzbId)}>
                <FaDownload size={18}/> Download
              </button>
              <Link to={`/post-details/${detail.nzbId}
`} className="btn btn-primary rounded-full hover:shadow-md transition-all duration-300">
                <FaInfoCircle size={18}/> Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GroupDetails;

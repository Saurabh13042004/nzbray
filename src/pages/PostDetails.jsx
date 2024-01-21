// PostDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IoMdDownload } from 'react-icons/io';

const convertBytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (bytes === 0) return '0 Byte';

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

  return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + ' ' + sizes[i];
};

const nzbId = window.location.pathname.split('/')[2];

const handleDownload = () => {
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

const PostDetails = () => {
  const params = useParams();
  const postId = params.postId;
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`https://nzbray-data.onrender.com/post-details/${postId}`);
        setPostDetails(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (!postDetails) {
    return (
      <div className='p-7 text-center'>
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="card bg-base-100 shadow-md p-5 m-5">
        <div className='card-body p-7'>
          <h1 className='text-2xl font-bold mb-4'>{postDetails.header}</h1>
          <div className='grid grid-cols-2 gap-4'>
            {postDetails.value.map((detail, index) => (
              <div key={index} className='mb-4'>
                <span className='font-bold'>
                {detail.label === 'Get NZB:'
                    ? <button className='btn btn-primary' onClick={handleDownload} > <IoMdDownload /> Download</button>
                    : detail.label
                  }
                  </span> {detail.content.replace('NZB⬇', '')}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='p-5 m-5'>
        <h1 className='text-2xl font-bold mb-4'>File Details:</h1>
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {postDetails.fileDetails.map((detail, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{detail.name}</td>
                <td>{convertBytesToSize(detail.size)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PostDetails;

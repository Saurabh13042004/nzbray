// Your React component where you want to add an NZB by URL

import React, { useState } from 'react';
import sabnzbdService from '../components/sabnzbdService'; // Adjust the path

const YourComponent = () => {
  const [url, setUrl] = useState('');
  const [nzbname, setNzbname] = useState('');
  // ... other state variables

  const handleAddNzb = async () => {
    try {
      const result = await sabnzbdService.addNzbByUrl(url, nzbname, /* other parameters */);
      console.log('NZB added successfully:', result);
      // Handle success, update UI, etc.
    } catch (error) {
      // Handle error, show error message, etc.
      console.error('Error adding NZB:', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <input type="text" placeholder="NZB Name" value={nzbname} onChange={(e) => setNzbname(e.target.value)} />
      {/* ... other input fields */}
      <button onClick={handleAddNzb}>Add NZB</button>
    </div>
  );
};

export default YourComponent;

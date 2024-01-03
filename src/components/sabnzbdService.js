// sabnzbdService.js

import axios from 'axios';

const API_BASE_URL = 'http://host:port/sabnzbd/api';
const API_KEY = 'your_api_key'; // Replace with the actual API key

const sabnzbdService = axios.create({
  baseURL: API_BASE_URL,
  params: {
    output: 'json',
    apikey: API_KEY,
  },
});

export const addNzbByUrl = async (url, nzbname, password, cat, script, priority, pp) => {
  try {
    const response = await sabnzbdService.get('/api', {
      params: {
        mode: 'addurl',
        name: encodeURIComponent(url),
        nzbname,
        password,
        cat,
        script,
        priority,
        pp,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding NZB:', error);
    throw error;
  }
};

// Add more functions for other SABnzbd API actions as needed

export default sabnzbdService;

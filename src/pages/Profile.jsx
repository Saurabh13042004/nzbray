import React, { useEffect, useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { collection, getDocs, updateDoc, doc, query, where, Query } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    // Check if the user is authenticated before accessing properties
    if (currentUser) {
      const uid = currentUser.uid;
      console.log(uid);
      const fetchUserData = async () => {
        try {
          const userId = auth.currentUser.uid;
          const q = query(collection(db, "users"), where("uid", "==", userId));
          const userSnapshot = await getDocs(q);
      
            const userData = userSnapshot.docs.map((doc) => {
                const userData = doc.data();
                return {
                id: doc.id,
                host: userData.host,
                port: userData.port,
                apiKey: userData.apiKey,
                };
            });
            console.log(userData[0]);
            setUserData(userData[0]);
        }
        catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      


      fetchUserData();
    }
  }, []);

  const handleEditClick = async () => {
    const newHost = prompt('Enter new host');
    const newPort = prompt('Enter new port');
    const newApiKey = prompt('Enter new API Key');
    const userCollection = collection(db, 'users');
    const payload = {
      host: newHost,
      port: newPort,
      apiKey: newApiKey,
    };
    await updateDoc(doc(userCollection, userData.id), payload);
    setUserData(payload);
  };

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full p-8 bg-base-100 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <div className="mb-4">
          <label htmlFor="host" className="block text-sm font-medium text-gray-600">
            SABnzbd Host
          </label>
          <div className="flex items-center">
            <span className="text-base-900 mr-2">{userData.host}</span>
            <BsPencil
              className="cursor-pointer text-base-500 hover:text-base-700"
              onClick={handleEditClick}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="port" className="block text-sm font-medium text-gray-600">
            SABnzbd Port
          </label>
          <div className="flex items-center">
            <span className="text-base-900 mr-2">{userData.port}</span>
            <BsPencil
              className="cursor-pointer text-base-500 hover:text-base-700"
              onClick={handleEditClick}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-600">
            SABnzbd API Key
          </label>
          <div className="flex items-center">
            <span className="text-base-900 mr-2">{userData.apiKey}</span>
            <BsPencil
              className="cursor-pointer text-base-500 hover:text-base-700"
              onClick={handleEditClick}
            />
          </div>
        </div>

        {/* Add more fields as needed */}

        {/* Save changes button */}
        <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Profile;
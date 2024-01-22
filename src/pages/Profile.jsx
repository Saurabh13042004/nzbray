import React, { useEffect, useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const userId = auth.currentUser.uid;
          const q = query(collection(db, 'users'), where('uid', '==', userId));
          const userSnapshot = await getDocs(q);

          const userData = userSnapshot.docs.map((doc) => ({
            id: doc.id,
            host: doc.data().host,
            port: doc.data().port,
            apiKey: doc.data().apikey,
          }));

          setUserData(userData[0]);
        } catch (error) {
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

    if (newHost || newPort || newApiKey) {
      const userCollection = collection(db, 'users');
      const payload = {
        host: newHost || userData.host,
        port: newPort || userData.port,
        apiKey: newApiKey || userData.apiKey,
      };

      await updateDoc(doc(userCollection, userData.id), payload);
      setUserData(payload);
    }
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
    navigate('/login');
    // You may want to redirect to the login page or update your app state accordingly.
  };

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full p-8 bg-base-200 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <div className="mb-4">
          <label htmlFor="host" className="block text-sm font-medium ">
            SABnzbd Host
          </label>
          <div className="flex items-center">
            <span className=" mr-2">{userData.host}</span>
            <BsPencil
              className="cursor-pointer hover:text-gray-700"
              onClick={handleEditClick}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="port" className="block text-sm font-medium ">
            SABnzbd Port
          </label>
          <div className="flex items-center">
            <span className=" mr-2">{userData.port}</span>
            <BsPencil
              className="cursor-pointer hover:text-gray-700"
              onClick={handleEditClick}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-sm font-medium ">
            SABnzbd API Key
          </label>
          <div className="flex items-center">
            <span className="mr-2">{userData.apiKey}</span>
            <BsPencil
              className="cursor-pointer hover:text-gray-700"
              onClick={handleEditClick}
            />
          </div>
        </div>

    
      <div className='flex justify-between py-3'>
        <button className="btn btn-primary  py-2 px-4 rounded-md  focus:outline-none focus:ring ">
          Save Changes
        </button>
        <button className='btn btn-primary '  onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

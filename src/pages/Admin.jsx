// AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { IoEnterSharp } from 'react-icons/io5';
import { FaUser, FaCog } from 'react-icons/fa'; // Add more icons as needed
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useTheme } from './ThemeContext';

const AdminPanel = () => {
  const { theme, switchTheme } = useTheme();
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [userName, setUserName] = useState('');
  const [assignedPlatform, setAssignedPlatform] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCodes, setTotalCodes] = useState(0);
  const [totalViews, setTotalViews] = useState(0); // Dummy data, replace with actual data

  const welcomeMessage = `Welcome back, Admin!`;

  useEffect(() => {
    fetchNoUsers();
    fetchNoGeneratedCodes();
    // Fetch and set dummy data for totalViews
    // Replace this with actual code to fetch website views
    setTotalViews(1000); // Dummy data, replace with actual data
  }, []);

  const fetchNoUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
  
      const userList = usersSnapshot.docs.map((doc) => {
        const userData = doc.data();
        return {
          email: userData.email,
          signedIn: userData.signedIn,
          userId: userData.userId,
          accessCode : userData.accessCode,
        };
      });

      setTotalUsers(userList.length);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchNoGeneratedCodes = async () => {
    try {
      const codesCollection = collection(db, 'accessCodes');
      const codesSnapshot = await getDocs(codesCollection);

      setTotalCodes(codesSnapshot.size);
    } catch (error) {
      console.error('Error fetching access codes:', error);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'users', label: 'Users', icon: 'users' },
    { id: 'settings', label: 'Settings', icon: 'cog' },
  ];

  // Function to generate a unique access code
  const generateUniqueCode = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return `INDEXARR-${randomNum}`;
  };

  const handleNavItemClick = (itemId) => {
    setActiveNavItem(itemId);
  };

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
  
      const userList = usersSnapshot.docs.map((doc) => {
        const userData = doc.data();
        const signedInDate = userData.signedIn ? userData.signedIn.toDate().toLocaleString() : 'N/A';
  
        return {
          email: userData.email,
          signedIn: signedInDate,
          userId: userData.userId,
          accessCode : userData.accessCode,
        };
      });
  
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const generateAccessCode = async () => {
    setLoading(true);

    try {
      const newCode = generateUniqueCode();

      const codesCollection = collection(db, 'accessCodes');
      await addDoc(codesCollection, {
        code: newCode,
        userName: userName,
        assignedPlatform: assignedPlatform,
        generatedAt: serverTimestamp(),
      });

      fetchGeneratedCodes();
    } catch (error) {
      console.error('Error generating access code:', error.message, error.code);
    } finally {
      setLoading(false);
    }
  };

  const fetchGeneratedCodes = async () => {
    try {
      const codesCollection = collection(db, 'accessCodes');
      const codesSnapshot = await getDocs(codesCollection);
      const codeList = codesSnapshot.docs.map((doc) => {
        const codeData = doc.data();
        return {
          code: codeData.code,
          userName: codeData.userName,
          assignedPlatform: codeData.assignedPlatform,
          generatedAt: codeData.generatedAt ? codeData.generatedAt.toDate().toLocaleString() : 'N/A',
        };
      });
      setGeneratedCodes(codeList);
    } catch (error) {
      console.error('Error fetching access codes:', error);
    }
  };

  useEffect(() => {
    if (activeNavItem === 'users') {
      fetchUsers();
    } else if (activeNavItem === 'settings') {
      fetchGeneratedCodes();
    }
  }, [activeNavItem]);

  const handleThemeSwitch = () => {
    const newTheme = theme === 'garden' ? 'dark' : 'light';
    switchTheme(newTheme);
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white dark:bg-gray-100 border-r overflow-y-auto transition-all duration-500">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-xl font-bold text-blue-600">Admin Panel</span>
        </div>
        <nav className="mt-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <IoEnterSharp /> },
            { id: 'users', label: 'Users', icon: <FaUser /> },
            { id: 'settings', label: 'Settings', icon: <FaCog /> },
            // Add more navigation items as needed
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => handleNavItemClick(item.id)}
              className={`group flex items-center px-4 py-2 cursor-pointer ${
                activeNavItem === item.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-3 text-blue-500 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-gray-400">
                {item.icon}
              </span>
              {item.label}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 text-dark">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'users', label: 'Users' },
                { id: 'settings', label: 'Settings' },
                // Add more navigation items as needed
              ].find((item) => item.id === activeNavItem)?.label}
            </h1>
          </div>
          <div>
            <button onClick={handleThemeSwitch}>Switch Theme</button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-slate-800 p-4 transition-all duration-500">
          {activeNavItem === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">{welcomeMessage}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h3 className="text-xl font-bold mb-2">Total Users</h3>
                  <p className="text-4xl font-bold">{totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h3 className="text-xl font-bold mb-2">Total Users Invited</h3>
                  <p className="text-4xl font-bold">{totalCodes}</p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h3 className="text-xl font-bold mb-2">Website Views</h3>
                  <p className="text-4xl font-bold">{totalViews}</p>
                </div>
              </div>
            </div>
          )}

          {activeNavItem === 'users' && (
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4">User Information</h2>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Signed In</th>
                      <th>User ID</th>
                      <th>Access Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.userId}>
                        <td>{user.email}</td>
                        <td>{user.signedIn}</td>
                        <td>{user.userId}</td>
                        <td>{user.accessCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeNavItem === 'settings' && (
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4">Access Code Generation</h2>
              {/* New: User Name Input */}
              <div className="mb-4">
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              {/* New: Assigned Platform Input */}
              <div className="mb-4">
                <label htmlFor="assignedPlatform" className="block text-sm font-medium text-gray-700">
                  Assigned Platform
                </label>
                <input
                  type="text"
                  id="assignedPlatform"
                  name="assignedPlatform"
                  value={assignedPlatform}
                  onChange={(e) => setAssignedPlatform(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <button
                onClick={generateAccessCode}
                disabled={loading}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Generate Access Code
              </button>
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Generated Access Codes</h3>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Assigned Platform</th>
                        <th>Code</th>
                        <th>Generated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedCodes.map((code) => (
                        <tr key={code.code}>
                          <td>{code.userName}</td>
                          <td>{code.assignedPlatform}</td>
                          <td>{code.code}</td>
                          <td>{code.generatedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
import React, { useState, useEffect } from 'react';
import { IoEnterSharp } from 'react-icons/io5';
import { FaUser, FaCog } from 'react-icons/fa';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useTheme } from './ThemeContext';
import { toast,ToastContainer } from 'react-toastify';

const AdminPanel = () => {
  const { theme, switchTheme } = useTheme();
  let count = 0;
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [userName, setUserName] = useState('');
  const [assignedPlatform, setAssignedPlatform] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCodes, setTotalCodes] = useState(0);
  const [totalViews, setTotalViews] = useState(0); // Dummy data, replace with actual data
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [adminId, setAdminId] = useState('');
  const [enabled, setEnabled] = useState(false);

  const checkConstructionPage = async () => {
    try {
      const constructionCollection = collection(db, 'constructionPage');
      const constructionSnapshot = await getDocs(constructionCollection);
      const constructionList = constructionSnapshot.docs.map((doc) => {
        const constructionData = doc.data();
        return {
          enabled: constructionData.enabled,
        };
      });
      const construction = constructionList.find((construction) => construction.enabled === true);
      if (construction) {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    } catch (error) {
      console.error('Error fetching construction page:', error);
    }
  };

  const toggleConstructionPage = async () => {
    try {
      const constructionCollection = collection(db, 'constructionPage');
      const constructionSnapshot = await getDocs(constructionCollection);
  
      if (constructionSnapshot.size === 0) {
        // If there are no documents, create a new one with enabled set to true
        await addDoc(constructionCollection, { enabled: true });
        setEnabled(true);
      } else {
        // If there is an existing document, update its enabled value
        const constructionDoc = constructionSnapshot.docs[0].ref;
        const constructionData = constructionSnapshot.docs[0].data();
  
        await updateDoc(constructionDoc, { enabled: !constructionData.enabled });
        setEnabled(!constructionData.enabled);
      }
    } catch (error) {
      console.error('Error toggling construction page:', error);
    }
  };



  useEffect(() => {
    checkConstructionPage();

    document.getElementById('modal').showModal();
    fetchNoUsers();
    fetchNoGeneratedCodes();
    // Fetch and set dummy data for totalViews
    // Replace this with actual code to fetch website views
    setTotalViews(1000); // Dummy data, replace with actual data
  }, []);
  const handleLogin = async () => {
    setLoading(true);
    const adminCollection = collection(db, 'admins');
    const adminSnapshot = await getDocs(adminCollection);
    const adminList = adminSnapshot.docs.map((doc) => {
      const adminData = doc.data();
      return {
        userName: adminData.userName,
        password: adminData.password,
      };
    });
    console.log(adminList);
    const admin = adminList.find((admin) => admin.userName === adminId);
    if (admin && admin.password === password) {
      setLoggedIn(true);
      document.getElementById('modal').close();
      toast.success('Welcome Admin')
    } else {
      alert('Invalid credentials');

    }
    setLoading(false);

  };

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
    { id: 'settings', label: 'Settings', icon: 'cog' },
  ];

  // Function to generate a unique access code
  const generateUniqueCode = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return `${assignedPlatform}-${randomNum}`;
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
          timestamp: userData.timestamp ? userData.timestamp.toDate().toLocaleString() : 'N/A',
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
        timesUsed: count, 
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
          timesUsed: codeData.timesUsed,
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
    <div>
      {loggedIn ? (
        <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          <header className="flex justify-between items-center p-4 border-b">
            <div>
              <h1 className="text-2xl font-bold  ">
                {[
                  { id: 'dashboard', label: 'Dashboard' },
                  { id: 'users', label: 'Users' },
                  { id: 'settings', label: 'Settings' },
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
                {/* Dashboard content here */}
                <h2 className="text-2xl font-bold mb-4 text-white">
  
                  Welcome to the Admin Panel!
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="card  bg-base-100 shadow-xl p-6 rounded-md">
                    <h3 className="text-xl font-bold mb-2">Total Users</h3>
                    <p className="text-4xl font-bold">{totalUsers}</p>
                  </div>
                  <div className="card  bg-base-100 shadow-xl p-6 rounded-md">
                    <h3 className="text-xl font-bold mb-2">Total Users Invited</h3>
                    <p className="text-4xl font-bold">{totalCodes}</p>
                  </div>
                  <div className="card  bg-base-100 shadow-xl p-6 rounded-md">
                    <h3 className="text-xl font-bold mb-2">Construction Page</h3>
                    <p className="text-4xl font-bold">
                      <input
                       type="checkbox" 
                       className="toggle toggle-md"
                        checked={enabled}
                        onClick={toggleConstructionPage}

                       
                       /></p>
                  </div>
                </div>

              </div>
            )}
  
  {/* {activeNavItem === 'users' && (
    <div className="card  bg-base-100 shadow-xl p-6 rounded-md">
  
      <div className="card-body">
        <h2 className="text-xl catd-title font-bold mb-4">User Information</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Access Code</th>
                <th>Timestamp</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.accessCode}</td>
                  <td>{user.timestamp}</td>
                  <td>{user.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )} */}
  
  
            {activeNavItem === 'settings' && (
              <div className="card bg-base-100 shadow-xl p-6 rounded-md">
                <div className="card-body">
                  <h2 className="card-title text-xl font-bold mb-4">Access Code Generation</h2>
                  {/* New: Platform Name Input */}
                  <div className="mb-4">
                    <label htmlFor="platformName" className="block text-sm font-medium label">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      id="platformName"
                      name="platformName"
                      value={assignedPlatform}
                      onChange={(e) => setAssignedPlatform(e.target.value)}
                      className="input input-bordered input-primary mt-1 p-2 w-full border rounded-md"
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
                            <th>Platform Name</th>
                            <th>Access Code</th>
                            <th>Times Used</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generatedCodes.map((code) => (
                            <tr key={code.code}>
                              <td>{code.assignedPlatform}</td>
                              <td>{code.code}</td>
                              {/* Assume 'timesUsed' is a property you store in Firestore */}
                              <td>{code.timesUsed}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`group flex flex-row items-center px-4 py-2 cursor-pointer ${
                  activeNavItem === item.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3 text-blue-500 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-gray-400">
                  {item.icon === 'home' && <IoEnterSharp />}
                  {item.icon === 'users' && <FaUser />}
                  {item.icon === 'cog' && <FaCog />}
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
  
  
      </div>
      ) : (
        <p>Loading.. </p>
      )}
      <dialog id="modal" className="modal">
    <div className="modal-box flex flex-col gap-4">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 className="font-bold text-lg mx-auto text-center">
        Admin Login 
      </h3>
      <div className="flex flex-col items-center mx-auto">
      <p className="text-center mb-4">
        Please enter your admin details to continue
      </p>
            <input
              type="text"
              placeholder="Enter Your Username"
              className="input input-bordered w-full max-w-xs text-center mb-4"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              className="input input-bordered w-full max-w-xs text-center mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn w-full max-w-xs text-center mb-4"
              onClick={handleLogin}
              disabled={loading}
            >
              Login
            </button>
            </div>
    </div>
  </dialog>
  <ToastContainer />
    </div>
  );
};

export default AdminPanel;

// AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useTheme } from './ThemeContext'

const AdminPanel = () => {
  const { theme, switchTheme } = useTheme();
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [users, setUsers] = useState([]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'users', label: 'Users', icon: 'users' },
    { id: 'settings', label: 'Settings', icon: 'cog' },
  ];

  const handleNavItemClick = (itemId) => {
    setActiveNavItem(itemId);
  };

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const userList = usersSnapshot.docs.map((doc) => {
        const userData = doc.data();
        return {
          email: userData.email,
          signedIn: userData.signedIn.toDate().toLocaleString(),
          userId: userData.userId,
        };
      });
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (activeNavItem === 'users') {
      fetchUsers();
    }
  }, [activeNavItem]);

  const handleThemeSwitch = () => {
    const newTheme = theme === 'garden' ? 'dark' : 'light';
    switchTheme(newTheme);
  };

  return (
    <div className={`flex h-screen ${theme === 'garden' ? 'dark' : 'light'}`}>
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r overflow-y-auto">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-xl font-bold text-blue-600">Admin Panel</span>
        </div>

        <nav className="mt-4">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNavItemClick(item.id)}
              className={`group flex items-center px-4 py-2 cursor-pointer ${
                activeNavItem === item.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              <svg
                className="mr-3 h-6 w-6 text-blue-500 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d={`M12 5v14m0-14l-8 8m16-8l-8 8`} />
              </svg>
              {item.label}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {navItems.find((item) => item.id === activeNavItem)?.label}
            </h1>
          </div>
          <div>
            <button onClick={handleThemeSwitch}>
              Switch Theme
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-slate-800 p-4">
          {activeNavItem === 'users' && (
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4">User Information</h2>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* Head */}
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Signed In</th>
                      <th>User ID</th>
                    </tr>
                  </thead>
                  {/* Body */}
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.userId}>
                        <td>{user.email}</td>
                        <td>{user.signedIn}</td>
                        <td>{user.userId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Add more conditional content for other nav items */}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

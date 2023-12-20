// ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('garden'); // Default theme

  const switchTheme = (newTheme) => {
    setTheme(newTheme);
    // Optionally, save the theme to localStorage or other storage
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

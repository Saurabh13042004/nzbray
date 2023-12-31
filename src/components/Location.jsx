import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function Location() {
  const location = useLocation();

  // Don't render the Navbar if the current path is '/signin'
  if (location.pathname === '/trail') {
    return null;
  }

  // Otherwise, render the Navbar
  return <Navbar />;
}

export default Location;
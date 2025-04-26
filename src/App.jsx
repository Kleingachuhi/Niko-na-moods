import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <div>
      {showNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}

export default App
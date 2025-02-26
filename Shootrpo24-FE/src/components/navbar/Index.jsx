import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth/auth_context';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const { cookies } = useAuth();
  const isHomePage = location.pathname === '/';
  const isAuthenticated = !!cookies.token;

  return (
    <nav className={styles.navbar}>
      {!isHomePage && (
        <div className={styles.navLinks}>
          {!isAuthenticated ? (
            <Link
              to="/auth"
              className={`${styles.link} ${location.pathname === '/auth' ? styles.activeLink : ''}`}
            >
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className={`${styles.link} ${location.pathname === '/dashboard' ? styles.activeLink : ''}`}
            >
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
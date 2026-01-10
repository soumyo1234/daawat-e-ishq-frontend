import { Bell, Heart, Menu, Search, Settings, Shield, ShoppingBag, User, X } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../admin/AdminAuthContext';
import logo from '../Assets/logo.PNG';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { admin, logout: adminLogout } = useContext(AdminAuthContext);
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and search when route changes
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Toggle body padding when mobile bottom nav is open so page content isn't hidden
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
    // cleanup on unmount
    return () => document.body.classList.remove('nav-open');
  }, [isOpen]);

  // Close dropdowns and mobile nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user menu if click is outside of user menu area
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
      // Close search dropdown if click is outside of search container area
      if (searchOpen && !event.target.closest('.search-container') && !event.target.closest('.mobile-search-bar')) {
        setSearchOpen(false);
      }
      // Close mobile bottom nav if click is outside of the nav and not the toggle button
      if (isOpen && !event.target.closest('.nav-center') && !event.target.closest('.mobile-menu-btn')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userMenuOpen, searchOpen, isOpen]); // Dependency array for `handleClickOutside`

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    if (admin) {
      adminLogout();
    } else {
      logout();
    }
    setUserMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          {/* Left: Logo and Brand */}
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <img src={logo} alt="Daawat-E-Ishq" />
              <span className="script-font">Daawat-E-Ishq</span>
            </Link>
          </div>

          {/* Center: Navigation Links - This becomes the bottom bar on mobile */}
          <div className={`nav-center ${isOpen ? 'active' : ''}`}>
            <div className="nav-menu">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)} // Close bottom menu when link is clicked
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Actions and User (Stays at the top on both desktop and mobile) */}
          <div className="nav-right">
            <div className="nav-actions">
              {/* Search */}
              <div className="search-container">
                <button
                  className="nav-action-btn search-btn"
                  onClick={() => setSearchOpen(!searchOpen)}
                  title="Search"
                >
                  <Search size={20} />
                </button>

                {/* Desktop Search Dropdown - Hidden on mobile by CSS */}
                {searchOpen && (
                  <div className="search-dropdown">
                    <form onSubmit={handleSearch} className="search-form">
                      <input
                        type="text"
                        placeholder="Search dishes, cuisines..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <button type="submit" className="search-submit-btn">
                        <Search size={16} />
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="nav-action-btn" title="Wishlist">
                <Heart size={20} />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="nav-action-btn cart-btn" title="Shopping Cart">
                <ShoppingBag size={20} />
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </Link>

              {/* User Menu or Login */}
              {user || admin ? (
                <div className="user-menu">
                  <button
                    className="nav-action-btn user-btn"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    title="User Menu"
                  >
                    <User size={20} />
                    {(user?.notifications || admin?.notifications) && (
                      <span className="notification-dot"></span>
                    )}
                  </button>

                  <div className={`user-dropdown ${userMenuOpen ? 'active' : ''}`}>
                    <div className="user-info">
                      <div className="user-avatar">
                        {(user?.avatar || admin?.avatar) ? (
                          <img src={user?.avatar || admin?.avatar} alt={user?.name || admin?.name} />
                        ) : (
                          <User size={24} />
                        )}
                      </div>
                      <div className="user-details">
                        <span className="user-name">{user?.name || admin?.name || 'User'}</span>
                        <span className="user-email">{user?.email || admin?.email}</span>
                        {admin && <span className="user-role text-orange-600 font-semibold">Admin</span>}
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>

                    {admin ? (
                      // Admin menu items
                      <>
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)}>
                          <Shield size={16} />
                          Admin Dashboard
                        </Link>
                        <Link to="/admin/menu" onClick={() => setUserMenuOpen(false)}>
                          <Settings size={16} />
                          Menu Management
                        </Link>
                        <Link to="/admin/orders" onClick={() => setUserMenuOpen(false)}>
                          <ShoppingBag size={16} />
                          Order Management
                        </Link>
                        <Link to="/admin/analytics" onClick={() => setUserMenuOpen(false)}>
                          <Bell size={16} />
                          Analytics
                        </Link>
                        <div className="dropdown-divider"></div>
                      </>
                    ) : (
                      // Regular user menu items
                      <>
                        <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}>
                          <Settings size={16} />
                          Dashboard
                        </Link>
                        <Link to="/profile" onClick={() => setUserMenuOpen(false)}>
                          <User size={16} />
                          Profile
                        </Link>
                        <Link to="/orders" onClick={() => setUserMenuOpen(false)}>
                          <ShoppingBag size={16} />
                          My Orders
                        </Link>
                        <Link to="/notifications" onClick={() => setUserMenuOpen(false)}>
                          <Bell size={16} />
                          Notifications
                        </Link>
                        <div className="dropdown-divider"></div>
                      </>
                    )}

                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary nav-login">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button - Toggles the bottom navigation bar */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Shows below the main navbar on mobile when searchOpen is true */}
        {searchOpen && (
          <div className="mobile-search-bar">
            <form onSubmit={handleSearch} className="mobile-search-form">
              <input
                type="text"
                placeholder="Search dishes, cuisines..."
                className="mobile-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="mobile-search-submit">
                <Search size={20} />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
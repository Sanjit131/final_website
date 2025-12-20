import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      className="bg-primary bg-opacity-25 text-white fixed top-4 z-50 left-0 right-0 mx-auto rounded-full shadow-2xl backdrop-blur-md border border-secondary border-opacity-50 w-[95%] max-w-4xl"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between h-16 px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/club_logo_1_1.png"
              alt="RACREC logo"
              loading="eager"
              decoding="async"
              className="w-10 h-10 rounded-full object-cover shadow-lg border-2 border-white border-opacity-30 bg-white"
            />
            <span className="font-bold text-xl">RACREC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-secondary hover:bg-opacity-30">
              Home
            </Link>

            {/* About Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-secondary hover:bg-opacity-30"
                onMouseEnter={() => setAboutDropdown(true)}
                onMouseLeave={() => setAboutDropdown(false)}
              >
                <span>About</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {aboutDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white bg-opacity-95 backdrop-blur-md text-text-dark rounded-lg shadow-lg py-2 border border-gray-200"
                    onMouseEnter={() => setAboutDropdown(true)}
                    onMouseLeave={() => setAboutDropdown(false)}
                  >
                    <Link to="/story" className="block px-4 py-2 hover:bg-gray-100">
                      Our Story
                    </Link>
                    <Link to="/team" className="block px-4 py-2 hover:bg-gray-100">
                      Our Team
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/impact" className="hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-secondary hover:bg-opacity-30">
              Our Impact
            </Link>

            <Link to="/gallery" className="hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-secondary hover:bg-opacity-30">
              Gallery
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-primary transition-colors p-2 rounded-full hover:bg-secondary hover:bg-opacity-30"
            onClick={toggleMenu}
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="md:hidden fixed top-20 right-4 w-64 h-screen bg-primary bg-opacity-25 backdrop-blur-md shadow-2xl rounded-2xl border border-secondary border-opacity-50"
          >
            <div className="p-6 space-y-4">
              <Link
                to="/"
                className="block text-white hover:text-accent transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/story"
                className="block text-white hover:text-accent transition-colors"
                onClick={toggleMenu}
              >
                Our Story
              </Link>
              <Link
                to="/team"
                className="block text-white hover:text-accent transition-colors"
                onClick={toggleMenu}
              >
                Our Team
              </Link>
              <Link
                to="/impact"
                className="block text-white hover:text-accent transition-colors"
                onClick={toggleMenu}
              >
                Projects & Events
              </Link>
              <Link
                to="/gallery"
                className="block text-white hover:text-accent transition-colors"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 
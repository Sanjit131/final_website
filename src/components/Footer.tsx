import { Link } from 'react-router-dom';
import { FiInstagram, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-accent text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/club_logo_1_1.png"
                alt="RACREC logo"
                className="w-10 h-10 rounded-full object-cover bg-white"
              />
              <span className="font-bold text-xl">RACREC</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering leaders and serving communities through meaningful initiatives and impactful projects at Rajalakshmi Engineering College.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/story" className="text-gray-300 hover:text-accent transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-accent transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-300 hover:text-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <a href="/old_site/index.html" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors">
                  Old Website
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-primary" />
                <a
                  href="mailto:rotaract@rajalakshmi.edu.in"
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  rotaract@rajalakshmi.edu.in
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-primary mt-1" />
                <div className="text-gray-300 text-sm">
                  <p>Rajalakshmi Engineering College</p>
                  <p>Chennai, Tamil Nadu</p>
                  <p>India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/rotaractrec/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-primary hover:bg-opacity-20 transition-colors duration-300"
              >
                <FiInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/rotaract-rec/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-primary hover:bg-opacity-20 transition-colors duration-300"
              >
                <FiLinkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Stay updated with our latest initiatives and events.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 Rotaract Club of REC
            </p>
            <p className="text-gray-300 text-sm mt-2 md:mt-0">
              Powered by passion, driven by purpose.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
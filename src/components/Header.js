import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-10 py-8">
        {/* Logo */}
        <img
          src="https://www.alliancefinance.lk/wp-content/uploads/2024/01/logo-new-removebg-preview.webp"
          alt="Alliance Finance Logo"
          className="h-12"
        />
        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <a href="https://www.alliancefinance.lk/investments/" className="hover:text-blue-600">
          Investments
          </a>
          <a href="https://www.alliancefinance.lk/about-us/" className="hover:text-blue-600">
            About Us
          </a>
          <a href="https://www.alliancefinance.lk/sustainability/" className="hover:text-blue-600">
            Sustainability
          </a>
          <a href="https://www.alliancefinance.lk/contact-us/" className="hover:text-blue-600">
            Contact
          </a>
        </nav>
        {/* Contact Details */}
        <div className="text-sm text-gray-600 md:block">
          <span>Hotline: 1321 | Email: info@alliancefinance.lk</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

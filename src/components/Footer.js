import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto text-center">
        {/* Contact Details */}
        <p className="text-gray-600">
          Alliance House, 84, Ward Place, Colombo 07, Sri Lanka.
        </p>
        <p className="text-gray-600">Hotline: 1321 | Fax: +94 11 2 697 205</p>
        <p className="text-gray-600">Email: info@alliancefinance.lk</p>

        {/* Quick Links */}
        <div className="mt-4">
          <a href="https://www.alliancefinance.lk/privacy-cookie-policy/" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="https://www.alliancefinance.lk/site-map/" className="text-blue-600 hover:underline">
            Sitemap
          </a>
        </div>

        {/* Awards Section */}
        <div className="mt-6">
          <p className="text-gray-600">© 2024. Alliance Finance Company PLC</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

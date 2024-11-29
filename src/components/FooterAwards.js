import React from 'react';



const Footer = () => {
  const handleLinkClick = (href) => {
    if (window.confirm(`Are you sure you want to leave Alliance Finance ?`)) {
      window.open(href, '_blank', 'noopener,noreferrer'); // Opens in new tab
    }
  };
  return (
    <footer className="bg-gray py-6">
      {/* Social Media Links */}
      <div className="container mx-auto px-6">
        <div className="flex justify-center space-x-14 mb-4">
          <a href="#" className="text-6xl text-blue-600 hover:text-blue-800 " onClick={() => handleLinkClick("https://www.facebook.com/afcplc/")} >
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-6xl text-blue-400 hover:text-blue-600" onClick={() => handleLinkClick("https://twitter.com/afc_plc")} >
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-6xl text-pink-600 hover:text-pink-800" onClick={() => handleLinkClick("https://www.instagram.com/afcplc/")} >
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-6xl text-blue-700 hover:text-blue-900" onClick={() => handleLinkClick("https://lk.linkedin.com/company/alliance-finance-company-plc")} >
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-6xl text-red-600 hover:text-red-800" onClick={() => handleLinkClick("https://www.youtube.com/channel/UCQC5YboaT93aWeQqsUerwzw?view_as=subscriber")} >
            <i className="fab fa-youtube"></i>
          </a>
          
        </div>
        <br/>
        <br/>
        <div className="text-center text-gray-700">
          {/* Privacy, Cookie, and Sitemap links */}
          <div className="space-x-10 ">
            <a href="https://www.alliancefinance.lk/privacy-cookie-policy/" className="text-xl border-b-2 border-transparent hover:border-b-2 hover:border-b-orange-500 hover:underline-offset-8 ">Privacy Policy</a>
            <a href="https://www.alliancefinance.lk/privacy-cookie-policy/" className="text-xl border-b-2 border-transparent hover:border-b-2 hover:border-b-orange-500 hover:underline-offset-8 ">Cookie Policy</a>
            <a href="https://www.alliancefinance.lk/site-map/" className="text-xl border-b-2 border-transparent hover:border-b-2 hover:border-b-orange-500 hover:underline-offset-8 ">Sitemap</a>
          </div>
        </div>
      </div>
      <br/>
      {/* Company Info */}
      <div className="container mx-auto px-6 mt-4 text-center text-gray-600 text-xl">
        <p>© 2024. Alliance Finance Company PLC</p>
      </div>
    </footer>
  );
};

export default Footer;

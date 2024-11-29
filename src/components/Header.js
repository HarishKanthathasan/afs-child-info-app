import React, { useState } from 'react';
import downArrowIcon from './arrow-down-angle.svg';
const menuItems = [
  {
    title: "About Us",
    links: [
      { name: "Our History", href: "https://www.alliancefinance.lk/about-us/our-history/" },
      { name: "Board of Directors", href: "https://www.alliancefinance.lk/about-us/board-of-directors/" },
      { name: "Awards and Accolades", href: "https://www.alliancefinance.lk/about-us/awards-and-accolades/" },
      { name: "Media Gallery", href: "https://www.alliancefinance.lk/about-us/media-gallery/" },
      { name: "Careers", href: "https://www.alliancefinance.lk/about-us/careers/" },
      { name: "AFC News", href: "https://www.alliancefinance.lk/about-us/afc-news/" },
    ],
  },
  {
    title: "Sustainability",
    links: [
      { name: "Business Philosophy", href: "https://www.alliancefinance.lk/sustainability/business-philosophy/" },
      { name: "Triple Bottom Line", href: "https://www.alliancefinance.lk/sustainability/triple-bottom-line-business-philosophy/" },
      { name: "Sustainability News", href: "https://www.alliancefinance.lk/sustainability/news/" },
      { name: "Dalu by AFC", href: "https://www.alliancefinance.lk/sustainability/dalu-by-afc/" },
    ],
  },
  {
    title: "Investor Relations",
    links: [
      { name: "Annual Reports", href: "https://www.alliancefinance.lk/investor-relations/#annual-reports" },
      { name: "Interim Reports", href: "https://www.alliancefinance.lk/investor-relations/#interim-reports" },
      { name: "Key Fact Documents", href: "https://www.alliancefinance.lk/investor-relations/#key-fact-documents" },
      { name: "Financial Statements", href: "https://www.alliancefinance.lk/investor-relations/#financial-statements" },
      { name: "Credit Rating Reports", href: "https://www.alliancefinance.lk/investor-relations/#credit-rating-reports" },
      { name: "Applications", href: "https://www.alliancefinance.lk/investor-relations/#applications" },
      { name: "Downloads", href: "https://www.alliancefinance.lk/downloads/" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "Fixed Deposits", href: "https://www.alliancefinance.lk/investments/fixed-deposits/" },
      { name: "Regular Savings", href: "https://www.alliancefinance.lk/investments/regular-savings/" },
      { name: "Senior Citizens Savings", href: "https://www.alliancefinance.lk/investments/senior-citizens-savings/" },
      { name: "Vehicle Leasing", href: "https://www.alliancefinance.lk/lending/vehicle-leasing/" },
      { name: "Gold Loans", href: "https://www.alliancefinance.lk/lending/gold-loans/" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { name: "Branch Network", href: "https://www.alliancefinance.lk/branch-network/" },
      { name: "FAQ", href: "https://www.alliancefinance.lk/faq/" },
      { name: "Promotions", href: "https://www.alliancefinance.lk/promotions/" },
      { name: "Customer Care", href: "https://www.alliancefinance.lk/customer-care/" },
      { name: "Customer Complaint Handling", href: "https://www.alliancefinance.lk/customer-complaint-handling/" },
    ],
  },
];
const Navbar = () => {
    const [activeItem, setActiveItem] = useState(null); // State to track active dropdown item
  
    const handleClick = (item) => {
      setActiveItem(item === activeItem ? null : item); // Toggle active state
    };

    const handleLinkClick = (href) => {
      if (window.confirm(`Are you sure you want to leave Alliance Finance ?`)) {
        // Don't prevent default behavior, allowing the link to open in a new tab
        return true;
      }
      return false;
    };
  
    return (
      <nav className="flex justify-between items-center py-4 px-7 bg-white shadow-md">
        <div className="flex items-center">
          <a href="https://www.alliancefinance.lk" className="flex items-center">
            <img
              src="https://www.alliancefinance.lk/wp-content/uploads/2024/01/logo-new-removebg-preview.webp"
              alt="Alliance Finance"
              className="w-20 h-auto"
            />
          </a>
        </div>
        <ul className="hidden md:flex space-x-8">
          {menuItems.map((item, index) => (
            <li key={index} className="relative">
              <button
                className={`flex items-center text-gray-800 hover:text-orange-500 focus:outline-none border-b-2 border-transparent hover:border-b-2 hover:border-b-orange-500 hover:underline-offset-8 ${
                  activeItem === item ? 'active' : ''
                }`} // Add 'active' class visually indicate open state
                onClick={() => handleClick(item)} // Call handleClick on button click
                
              >
                {item.title}
                <img src={downArrowIcon} alt="Dropdown Icon" className="ml-1 size-2" />
              </button>
              {item.links && ( // Render dropdown only if links exist
                <div className={`absolute bg-white shadow-lg mt-2 border rounded-md ${activeItem === item ? 'block' : 'hidden'} min-w-48 md:min-w-64 max-w-screen-sm`}>
                  <ul className="py-2">
                    {item.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                        href={link.href}
                        className="block px-4 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                        onClick={() => handleLinkClick(link.href)} // Call handleLinkClick on link click
                      >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <div className="text-sm text-gray-600 md:block">
            <span>Hotline: 1321 | Email: info@alliancefinance.lk</span>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
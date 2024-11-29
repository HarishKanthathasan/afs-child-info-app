import React from 'react';
import FooterLogo from './FooterLogo';
import FooterContact from './FooterContact';
import FooterAwards from './FooterAwards';

const Footer = () => {
  return (
    <div className="bg-[#ededed] py-12 px-6 md:px-12">
      <div className="flex flex-wrap justify-between">
        {/* Left Section */}
        <div className="w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0 mx-8">
          <FooterLogo />
          <FooterContact />
        </div>
        
        {/* Right Section */}
        <div className="w-full md:w-1/2 lg:w-1/3 md:mb-0 mx-12 my-12">
          <FooterAwards />
        </div> 
      </div>
    </div>
  );
};

export default Footer;

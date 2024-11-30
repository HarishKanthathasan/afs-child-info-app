import React from "react";

const ContactUsSection = () => {
  return (
    <section
      className="bg-gradient-to-r from-[#e3a08d] via-[#f8a51d] to-[#48ba64] animate-gradient-x p-12 rounded-2xl shadow-xl mx-auto my-12 w-10/12 max-w-full flex justify-between items-center"
    >
      {/* Left Side - Text Section */}
      <div className="text-left max-w-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          At Alliance Finance Company we are here to help you.
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Your questions and feedback are important to us. Just call us or drop us an email for all your inquiries and comments.
        </p>
      </div>

      {/* Right Side - Call Us Button */}
      <div className="flex justify-center items-center">
        <a
          href="tel:+94112673673"
          className="inline-flex items-center text-white bg-primary py-3 px-6 mx-10 rounded-full shadow-lg hover:bg-blue-950 transition-all duration-300"
        >
          <span className="mr-3">Call Us Today</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 50 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              stroke="#ffffff"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0, 0 45, 40 0, 80"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default ContactUsSection;

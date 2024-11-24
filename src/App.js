import React, { useState } from 'react';
import Header from './components/Header';
import ChildForm from './components/ChildForm';
import ParentForm from './components/ParentForm';
import ConfirmationModal from './components/ConfirmationModal';
import ReCAPTCHA from 'react-google-recaptcha';


const App = () => {
  const [childFormData, setChildFormData] = useState({
    childName: '',
    dob: '',
    placeOfBirth: '',
    birthCertificateNumber: '',
    dateOfIssue: '',
    nationality: '',
    address: '',
    school: ''
  });

  const [parentFormData, setParentFormData] = useState({
    parentName: '',
    nic: '',
    contact: '',
    parentAddress: '',
    email: '',
    occupation: '',
    relationship: ''
  });

  const [errors, setErrors] = useState({});
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChildChange = (e) => {
    const { name, value } = e.target;
    setChildFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParentFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Child form validation
    if (!childFormData.childName) {
      formErrors.childName = 'Full Name is required';
      isValid = false;
    }
    if (!childFormData.dob) {
      formErrors.dob = 'Date of Birth is required';
      isValid = false;
    }
    if (!childFormData.placeOfBirth) {
      formErrors.placeOfBirth = 'Place of Birth is required';
      isValid = false;
    }
    if (!childFormData.birthCertificateNumber) {
      formErrors.birthCertificateNumber = 'Birth Certificate Number is required';
      isValid = false;
    }
    if (!childFormData.dateOfIssue) {
      formErrors.dateOfIssue = 'Date of Issue is required';
      isValid = false;
    }
    if (!childFormData.nationality) {
      formErrors.nationality = 'Nationality is required';
      isValid = false;
    }
    if (!childFormData.address) {
      formErrors.address = 'Address is required';
      isValid = false;
    }
    if (!childFormData.school) {
      formErrors.school = 'School is required';
      isValid = false;
    }

    // Parent form validation
    if (!parentFormData.parentName) {
      formErrors.parentName = 'Full Name is required';
      isValid = false;
    }
    if (!parentFormData.nic) {
      formErrors.nic = 'NIC is required';
      isValid = false;
    }
    if (!parentFormData.contact) {
      formErrors.contact = 'Contact Number is required';
      isValid = false;
    }
    if (!parentFormData.parentAddress) {
      formErrors.parentAddress = 'Address is required';
      isValid = false;
    }
    if (!parentFormData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    }
    if (!parentFormData.occupation) {
      formErrors.occupation = 'Occupation is required';
      isValid = false;
    }
    if (!parentFormData.relationship) {
      formErrors.relationship = 'Relationship is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    }
  };

  const handleSubmit = () => {
    if (validateForm() && captchaVerified) {
      setModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header/>
      <header className="bg-blue-600 text-white py-4 text-center text-xl font-semibold">
        Child and Parent/Guardian Information Form
      </header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Child Form */}
          <ChildForm onChange={handleChildChange} errors={errors} />
          {/* Parent Form */}
          <ParentForm onChange={handleParentChange} errors={errors} />
        </div>

        {/* reCAPTCHA */}
        <div className="my-6 text-center">
          <ReCAPTCHA
            sitekey="6Lexv4cqAAAAAIwtF9huxTa80Gs-Qqbr7qeMitiV"
            onChange={handleCaptchaChange}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalOpen && (
        <ConfirmationModal
          onClose={() => setModalOpen(false)}
          onConfirm={() => {
            // Here you would handle form submission to Google Sheets or backend
            console.log('Form submitted');
            setModalOpen(false);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 text-center">
        <div className="contact-info">
          <p>General Number: +94 11 2 673 673</p>
          <p>Hotline: 1321</p>
          <p>Fax: + 94 11 2 697 205</p>
          <p>Email: info@www.alliancefinance.lk</p>
          <p>Open Hours: Weekdays 8.30am to 5.00pm</p>
        </div>
        <p>&copy; 2024 Alliance Finance Sri Lanka</p>
      </footer>
    </div>
  );
};

export default App;
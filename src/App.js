import React, { useState } from "react";
import Header from "./components/Header";
import ChildForm from "./components/ChildForm";
import ParentForm from "./components/ParentForm";
import ConfirmationModal from "./components/ConfirmationModal";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ContactUsSection from "./components/ContactUsSection";
import axios from "axios";

const App = () => {
  // State for child and parent form data
  const [childFormData, setChildFormData] = useState({
    childName: "",
    dob: "",
    placeOfBirth: "",
    birthCertificateNumber: "",
    dateOfIssue: "",
    nationality: "",
    address: "",
    school: "",
  });

  const [parentFormData, setParentFormData] = useState({
    parentName: "",
    nic: "",
    contact: "",
    parentAddress: "",
    email: "",
    occupation: "",
    relationship: "",
  });

  // State for validation errors and submission feedback
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Handle changes in the child form fields
  const handleChildChange = (e) => {
    const { name, value } = e.target;
    setChildFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes in the parent form fields
  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParentFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate the entire form (client-side validation)
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Child form validation
    if (!childFormData.childName) {
      formErrors.childName = "Child Name is required";
      isValid = false;
    }
    if (!childFormData.dob) {
      formErrors.dob = "Date of Birth is required";
      isValid = false;
    }
    if (!childFormData.placeOfBirth) {
      formErrors.placeOfBirth = "Place of Birth is required";
      isValid = false;
    }
    if (!childFormData.birthCertificateNumber) {
      formErrors.birthCertificateNumber = "Birth Certificate Number is required";
      isValid = false;
    }
    if (!childFormData.dateOfIssue) {
      formErrors.dateOfIssue = "Date of Issue is required";
      isValid = false;
    }
    if (!childFormData.nationality) {
      formErrors.nationality = "Nationality is required";
      isValid = false;
    }
    if (!childFormData.address) {
      formErrors.address = "Address is required";
      isValid = false;
    }
    if (!childFormData.school) {
      formErrors.school = "School is required";
      isValid = false;
    }

    // Parent form validation
    if (!parentFormData.parentName) {
      formErrors.parentName = "Parent Name is required";
      isValid = false;
    }
    if (!parentFormData.nic) {
      formErrors.nic = "NIC is required";
      isValid = false;
    }
    if (!parentFormData.contact) {
      formErrors.contact = "Contact Number is required";
      isValid = false;
    }
    if (!parentFormData.parentAddress) {
      formErrors.parentAddress = "Address is required";
      isValid = false;
    }
    if (!parentFormData.email) {
      formErrors.email = "Email is required";
      isValid = false;
    }
    if (!parentFormData.occupation) {
      formErrors.occupation = "Occupation is required";
      isValid = false;
    }
    if (!parentFormData.relationship) {
      formErrors.relationship = "Relationship is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Send form data to backend
      const response = await axios.post("http://localhost:3000/submit", {
        childFormData,
        parentFormData,
      });

      if (response.status === 200) {
        setModalOpen(true);
        setSubmissionError("");
      } else {
        setSubmissionError("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setSubmissionError("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 p-8">
        <div className="container mx-auto">
          {/* Child Form Section */}
          <div className="flex flex-col bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <ChildForm onChange={handleChildChange} errors={errors} />
              </div>
              <div className="w-full md:w-1/2 flex items-center">
                <img
                  src="https://www.alliancefinance.lk/wp-content/uploads/2024/01/regular-saving.webp"
                  alt="Child"
                  className="w-full rounded-lg hidden md:block"
                />
              </div>
            </div>
          </div>

          {/* Parent Form Section */}
          <div className="flex flex-col bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <img
                  src="https://www.alliancefinance.lk/wp-content/uploads/2024/05/371494127_165471586592403_7252068926377158011_n-1000x1000-1-1-768x76811-ezgif.com-optiwebp-2.webp"
                  alt="Parent"
                  className="w-full rounded-lg hidden md:block"
                />
              </div>
              <div className="w-full md:w-1/2">
                <ParentForm onChange={handleParentChange} errors={errors} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center py-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
            {submissionError && (
              <p className="text-red-500 text-sm mt-2">{submissionError}</p>
            )}
          </div>
        </div>

        {/* Confirmation Modal */}
        {modalOpen && (
          <ConfirmationModal
            onClose={() => setModalOpen(false)}
          />
        )}
      </main>
      <WhatsAppButton />
      <ContactUsSection />
      <Footer />
    </div>
  );
};

export default App;

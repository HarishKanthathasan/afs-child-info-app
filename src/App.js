import React, { useState } from "react";
import Header from "./components/Header";
import ChildForm from "./components/ChildForm";
import ParentForm from "./components/ParentForm";
import ConfirmationModal from "./components/ConfirmationModal";
import Footer from "./components/Footer";

const App = () => {
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

  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState(""); // To display below the submit button
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
      formErrors.childName = "Full Name is required";
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
      formErrors.birthCertificateNumber =
        "Birth Certificate Number is required";
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
      formErrors.parentName = "Full Name is required";
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

  // Handle the form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ childFormData, parentFormData }),
      });

      const result = await response.json();

      if (response.ok) {
        setModalOpen(true);
        setSubmissionError("");
      } else {
        setSubmissionError(result.message || "Submission failed. Try again.");
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
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChildForm onChange={handleChildChange} errors={errors} />
          <ParentForm onChange={handleParentChange} errors={errors} />
        </div>
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
        {modalOpen && (
          <ConfirmationModal
            onClose={() => setModalOpen(false)}
            onConfirm={() => setModalOpen(false)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
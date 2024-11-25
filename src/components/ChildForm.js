import React, { useState } from 'react';

const ChildForm = ({ onChange, errors }) => {
  const [eighteenthBirthday, setEighteenthBirthday] = useState('');

  // Function to calculate the 18th birthday based on DOB
  const handleDOBChange = (e) => {
    const dob = e.target.value;
    const dobDate = new Date(dob);

    if (!isNaN(dobDate)) {
      const eighteenthBirthdayDate = new Date(
        dobDate.getFullYear() + 18,
        dobDate.getMonth(),
        dobDate.getDate() + 1
      );
      setEighteenthBirthday(eighteenthBirthdayDate.toISOString().split('T')[0]);
    } else {
      setEighteenthBirthday('');
    }

    // Trigger parent form's onChange function
    onChange(e);
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-primary text-xl font-semibold mb-4">Child's Information</h2>
      <form>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="childName"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.childName && 'border-red-500'}`}
          />
          {errors.childName && <p className="text-red-500 text-sm">{errors.childName}</p>}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            onChange={handleDOBChange}
            className={`border p-2 w-full rounded ${errors.dob && 'border-red-500'}`}
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        {/* 18th Birthday */}
        <div className="mb-4">
          <label className="block text-gray-700">18th Birthday</label>
          <input
            type="text"
            name="eighteenthBirthday"
            value={eighteenthBirthday}
            readOnly
            className="border p-2 w-full rounded bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Place of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700">Place of Birth</label>
          <input
            type="text"
            name="placeOfBirth"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.placeOfBirth && 'border-red-500'}`}
          />
          {errors.placeOfBirth && <p className="text-red-500 text-sm">{errors.placeOfBirth}</p>}
        </div>

        {/* Birth Certificate Number */}
        <div className="mb-4">
          <label className="block text-gray-700">Birth Certificate Number</label>
          <input
            type="text"
            name="birthCertificateNumber"
            onChange={onChange}
            className={`border p-2 w-full rounded ${
              errors.birthCertificateNumber && 'border-red-500'
            }`}
          />
          {errors.birthCertificateNumber && (
            <p className="text-red-500 text-sm">{errors.birthCertificateNumber}</p>
          )}
        </div>

        {/* Date of Issue */}
        <div className="mb-4">
          <label className="block text-gray-700">Date of Issue</label>
          <input
            type="date"
            name="dateOfIssue"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.dateOfIssue && 'border-red-500'}`}
          />
          {errors.dateOfIssue && <p className="text-red-500 text-sm">{errors.dateOfIssue}</p>}
        </div>

        {/* Nationality */}
        <div className="mb-4">
          <label className="block text-gray-700">Nationality</label>
          <input
            type="text"
            name="nationality"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.nationality && 'border-red-500'}`}
          />
          {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.address && 'border-red-500'}`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {/* School */}
        <div className="mb-4">
          <label className="block text-gray-700">School</label>
          <input
            type="text"
            name="school"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.school && 'border-red-500'}`}
          />
          {errors.school && <p className="text-red-500 text-sm">{errors.school}</p>}
        </div>
      </form>
    </div>
  );
};

export default ChildForm;

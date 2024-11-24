import React from 'react';

const ParentForm = ({ onChange, errors }) => {
  return (
    <div className="bg-white p-6 rounded shadow-lg mt-6">
      <h2 className="text-primary text-xl font-semibold mb-4">Parent/Guardian Information</h2>
      <form>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="parentName"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.parentName && 'border-red-500'}`}
          />
          {errors.parentName && <p className="text-red-500 text-sm">{errors.parentName}</p>}
        </div>

        {/* NIC */}
        <div className="mb-4">
          <label className="block text-gray-700">NIC</label>
          <input
            type="text"
            name="nic"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.nic && 'border-red-500'}`}
          />
          {errors.nic && <p className="text-red-500 text-sm">{errors.nic}</p>}
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label className="block text-gray-700">Contact Number</label>
          <input
            type="text"
            name="contact"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.contact && 'border-red-500'}`}
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="parentAddress"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.parentAddress && 'border-red-500'}`}
          />
          {errors.parentAddress && <p className="text-red-500 text-sm">{errors.parentAddress}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.email && 'border-red-500'}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Occupation */}
        <div className="mb-4">
          <label className="block text-gray-700">Occupation</label>
          <input
            type="text"
            name="occupation"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.occupation && 'border-red-500'}`}
          />
          {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
        </div>

        {/* Relationship */}
        <div className="mb-4">
          <label className="block text-gray-700">Relationship</label>
          <select
            name="relationship"
            onChange={onChange}
            className={`border p-2 w-full rounded ${errors.relationship && 'border-red-500'}`}
          >
            <option value="">-- Select Relationship --</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Guardian">Guardian</option>
          </select>
          {errors.relationship && <p className="text-red-500 text-sm">{errors.relationship}</p>}
        </div>
      </form>
    </div>
  );
};

export default ParentForm;

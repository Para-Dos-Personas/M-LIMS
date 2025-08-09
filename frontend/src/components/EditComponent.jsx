import React, { useState } from 'react';
import { updateComponent } from '../services/componentService';

function EditComponent({ component, onSuccess }) {
  const [formData, setFormData] = useState({
    name: component.name,
    quantity: component.quantity,
    // Add other fields here like description, type, etc.
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateComponent(component.id, formData);
      onSuccess?.(data); // optional chaining if passed
    } catch (err) {
      console.error('Failed to update:', err);
      alert('Update failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </label>
      {/* Add more inputs as needed */}
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditComponent;
import React, { useState } from 'react';
import './form-input.css';

const FormInput = ({ sendContactData }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { value, name } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    sendContactData({
      name: name,
      number: number,
    });
    setName('');
    setNumber('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <div className="input-name">
          <h3>Name</h3>
          <input
            type="text"
            name="name"
            className="input"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-number">
          <h3>Number</h3>
          <input
            type="tel"
            name="number"
            className="input"
            value={number}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn" type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
};

export default FormInput;

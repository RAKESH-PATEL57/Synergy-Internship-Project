// UserForm.js
import { useState } from 'react';
import axios from 'axios';


function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);

  const validateForm = () => {
    if (name.length < 3) return 'Name must be at least 3 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
    if (!/^\d{10}$/.test(phone)) return 'Invalid phone number';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        name,
        email,
        phone,
      });
      console.log('User created:', response.data);
      
    } catch (err) {
      setError(`Failed to create user due to ${err}`);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Create User</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
};

export default CreateUser;

import { useState, useEffect } from 'react';
import axios from 'axios';

function GettingData() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nextUserId, setNextUserId] = useState(1); // Track the next available ID
  const [loading, setLoading] = useState(true); // Loading state

  // Fetching users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        // Set nextUserId as one greater than the highest existing user ID
        const maxId = Math.max(...response.data.map(user => user.id), 0);
        setNextUserId(maxId + 1);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchUsers();
  }, []);

  // Handling user creation
  const handleCreate = async (userData) => {
    try {
      const newUser = { ...userData, id: nextUserId }; // Assign a new ID
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      setUsers([...users, { ...response.data, id: nextUserId }]); // Set the new user with unique ID
      setNextUserId(nextUserId + 1); // Increment nextUserId for the next new user
      setIsEditing(false);
      setSelectedUser(null); // Clear selected user after creating a new one
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Handling user update
  const handleUpdate = async (userData) => {
    if (!selectedUser) return; // Guard clause
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, userData);
      const updatedUsers = users.map((user) => (user.id === selectedUser.id ? response.data : user));
      setUsers(updatedUsers);
      setIsEditing(false);
      setSelectedUser(null); // Clear the form after updating
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handling user deletion
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const updatedUsers = users.filter((user) => user.id !== userId); // Remove the deleted user from the list
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Open the form to edit a user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  return (
    <div className='container'>
      <h1>User List</h1>
      <button id='createUser-btn' onClick={() => { setIsEditing(true); setSelectedUser(null); }}>Create User</button>

      {loading ? (
        <div>Loading...</div> // Display loading message while fetching data
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className='btns'>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* The form for editing or creating a user */}
      {isEditing && (
        <div className='editing_Creating_Container'>
          <h2 className='heading'>{selectedUser ? 'Edit User' : 'Create User'}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const userData = Object.fromEntries(formData); // Extract form data into an object
            if (selectedUser) {
              handleUpdate(userData);
            } else {
              handleCreate(userData);
            }
          }}>
          <div  className='user_Details'>

            <div>
              <label>Name:</label>
              <input type="text" name="name" defaultValue={selectedUser?.name || ''} required />
            </div>
            <div>
              <label>Username:</label>
              <input type="text" name="username" defaultValue={selectedUser?.username || ''} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" defaultValue={selectedUser?.email || ''} required />
            </div>
            <button type="submit">{selectedUser ? 'Update' : 'Create'}</button>
          </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default GettingData;

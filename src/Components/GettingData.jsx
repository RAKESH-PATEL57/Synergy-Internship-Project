import { useState, useEffect } from 'react';
import axios from 'axios';

function GettingData() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nextUserId, setNextUserId] = useState(1); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [closeBtnClassName, setCloseBtnClassName] = useState('editing_Creating_Container');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        const maxId = Math.max(...response.data.map(user => user.id), 0);
        setNextUserId(maxId + 1);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleCreate = async (userData) => {
    try {
      const newUser = { ...userData, id: nextUserId };
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      setUsers([...users, { ...response.data, id: nextUserId }]);
      setNextUserId(nextUserId + 1);
      setIsEditing(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdate = async (userData) => {
    if (!selectedUser) return;
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, userData);
      const updatedUsers = users.map((user) => (user.id === selectedUser.id ? response.data : user));
      setUsers(updatedUsers);
      setIsEditing(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setCloseBtnClassName("editing_Creating_Container");
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='container'>
      <h1>User List</h1>
      <button id='createUser-btn' onClick={() => { setIsEditing(true); setSelectedUser(null); setCloseBtnClassName("editing_Creating_Container");}}>Create User</button>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name, username, or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        id="searchBar"
      />

      {loading ? (
        <div>Loading...</div>
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
            {filteredUsers.map((user) => (
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

      {isEditing && (
        <div className={closeBtnClassName} onClick={() => setCloseBtnClassName("close")}>
          <svg id='closIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          <h2 className='heading'>{selectedUser ? 'Edit User' : 'Create User'}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const userData = Object.fromEntries(formData);
            if (selectedUser) {
              handleUpdate(userData);
            } else {
              handleCreate(userData);
            }
          }}>
            <div className='user_Details'>
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

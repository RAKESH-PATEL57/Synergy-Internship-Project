// components/UserList.js
import { useEffect, useState } from 'react';
import axios from 'axios';
// import CreateUserModal from './CreateUserModal';

function FetchUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="user-list">
      <h1>User Management</h1>
      <button >Create User</button>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FetchUsers;

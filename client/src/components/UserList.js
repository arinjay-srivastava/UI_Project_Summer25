import React, { useState, useEffect } from 'react';

function UserList({ currentUserId }) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/all/${currentUserId}`);
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      setMessage('Failed to load users.');
    }
  };

  const followUser = async (followedId) => {
    try {
      const response = await fetch('http://localhost:3000/api/follower/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId, followingId: followedId })
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error following user.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="card p-3 mt-4">
      <h4>Other Users</h4>
      {message && <p>{message}</p>}
      <ul className="list-group">
        {users.map(user => (
          <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.userName}
            <button className="btn btn-sm btn-primary" onClick={() => followUser(user._id)}>
              Follow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

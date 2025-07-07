import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserName(storedUser.userName);
      setUserId(storedUser._id);
      fetchUserNotes(storedUser._id);
    }
  }, []);

  const fetchUserNotes = async (userId) => {
    try {
      const response = await fetch('http://localhost:3000/api/note/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId: userId })
      });
      const data = await response.json();
      if (data.note) setNotes([data.note]); // for now it shows a single note
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/note/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, content })
      });
      const data = await response.json();
      if (response.ok) {
        setNotes([...notes, data.note]);
        setContent('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="card p-4 mt-3">
      <h2>Welcome, {userName}</h2>

      <form onSubmit={handleCreateNote}>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">Add Note</button>
      </form>

      <h4 className="mt-4">Your Notes</h4>
      <ul className="list-group">
        {notes.map((note, index) => (
          <li key={index} className="list-group-item">{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProfilePage;

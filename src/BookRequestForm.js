import React, { useState } from 'react';
import { acadBooks } from './data';
import { Link } from 'react-router-dom';

const classes = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
const subjects = ["Math", "English", "Science", "Social Studies", "Hindi"];

export default function BookRequestForm() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [match, setMatch] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = acadBooks.find(
      (b) => b.class === selectedClass && b.subject === selectedSubject
    );
    setMatch(found || "none");
  };

  return (
    <div className="container mt-5 text-white">
      <Link to="/" className="btn btn-outline-light mb-3">← Back to Home</Link>
      <div className="card p-4 bg-dark text-white shadow" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="mb-4 text-center">📘 Request an Academic Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select Class</label>
            <select className="form-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required>
              <option value="">-- Select Class --</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Select Subject</label>
            <select className="form-select" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} required>
              <option value="">-- Select Subject --</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary w-100">Request Book</button>
        </form>

        {match && (
          <div className="alert alert-info mt-4">
            {match === "none" ? (
              <div>No matching donation found. Try another subject or class!</div>
            ) : (
              <>
                <h5>Donor Found!</h5>
                <p><strong>Title:</strong> {match.title}</p>
                <p><strong>Author:</strong> {match.author}</p>
                <p><strong>Donor:</strong> {match.donorName}</p>
                <p><strong>Email:</strong> {match.email}</p>
                <p><strong>Pickup Location:</strong> {match.location}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

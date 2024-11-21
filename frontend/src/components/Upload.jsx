import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
/*     if (!file || !patientName || !age || !date || !symptoms) {
      setMessage('All fields are required.');
      return;
    } */

    const formData = new FormData();
    formData.append('audio', file);
    formData.append('patientName', patientName);
    formData.append('age', age);
    formData.append('date', date);
    formData.append('symptoms', symptoms);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('File uploaded successfully!');
      console.log('Uploaded Data:', response.data);
    } catch (error) {
      console.error('Upload Error:', error);
      setMessage('Error uploading file.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Audio File</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Audio File:</label>
          <input type="file" accept="audio/*" onChange={handleFileChange} />
        </div>
        <div>
          <label>Patient Name:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Symptoms:</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;

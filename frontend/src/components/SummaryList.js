import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SummaryList = () => {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      const response = await axios.get('http://localhost:5000/summaries');
      setSummaries(response.data);
    };

    fetchSummaries();
  }, []);

  return (
    <div>
      <h2>Healthcare Summaries</h2>
      {summaries.map((summary) => (
        <div key={summary.id}>
          <p><strong>Patient:</strong> {summary.patient_name}, {summary.age} years old</p>
          <p><strong>Date:</strong> {summary.date}</p>
          <p><strong>Symptoms:</strong> {summary.symptoms}</p>
          <p><strong>Transcription:</strong> {summary.transcription}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryList;

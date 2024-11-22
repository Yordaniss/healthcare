import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/PatientDetail.css";

function parseRecommendations(text) {
  // Use regex to split at each asterisk (*) that's at the beginning of a line or after a newline
  return text
    .split(/\n\*|\*/g) // Split on newline followed by asterisk or just an asterisk
    .map((rec) => rec.trim()) // Remove leading/trailing whitespace
    .filter((rec) => rec !== "") // Remove empty entries
    .map((rec) => {
      // Match bold headings (text between **)
      const match = rec.match(/^\*\*(.*?)\*\*:\s*(.*)/);
      return match
        ? { heading: match[1], details: match[2] }
        : { heading: "", details: rec }; // Handle cases without a bold heading
    });
}

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://localhost:5000/patients/${id}`);
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <p>Loading patient details...</p>;

  const parsedData = parseRecommendations(patient.recommendations);
  return (
    <div className="patient-detail">
      <h2>{patient.patient_name}</h2>
      <p>
        <strong>Age:</strong> {patient.age}
      </p>
      <p>
        <strong>Date:</strong> {new Date(patient.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Symptoms:</strong> {patient.symptoms}
      </p>
      <p>
        <strong>Transcription:</strong> {patient.transcription}
      </p>
      <div className="recommendations">
        <h3>Recommendations</h3>
        <ul>
          {parsedData.map((rec, index) => (
            <li key={index}>
              {rec.heading ? (
                <>
                  <strong>{rec.heading}:</strong> {rec.details}
                </>
              ) : (
                rec.details
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/PatientDetail.css";

function parseRecommendations(text) {
  const parsedData = {};

  const sections = text.split(
    /(?=\*\*Possible causes:\*\*|\*\*Symptoms:\*\*|\*\*Recommended treatment:\*\*|\*\*Note:\*\*)/
  );

  sections.forEach((section) => {
    if (section.startsWith("**Possible causes:**")) {
      parsedData.possibleCauses = section
        .replace("**Possible causes:**", "")
        .split(/\*\*\d+\.\s*/)
        .filter((cause) => cause.trim() !== "")
        .map((cause) => cause.trim().replace(/^\*\*/, ""));
    }

    if (section.startsWith("**Symptoms:**")) {
      parsedData.symptoms = section
        .replace("**Symptoms:**", "")
        .split(/[-•]/)
        .filter((symptom) => symptom.trim() !== "")
        .map((symptom) => symptom.trim());
    }

    if (section.startsWith("**Recommended treatment:**")) {
      parsedData.treatment = section
        .replace("**Recommended treatment:**", "")
        .split(/\n/) // Split by newlines to handle each line separately
        .filter((line) => line.trim() !== "") // Remove any empty lines
        .map((line) => {
          // Find the first dash and split at it, leaving "Over-the-counter" intact
          const parts = line.split(/ - (.+)/); // Split on the first dash, capture the rest of the line
          return parts.length > 1
            ? {
                heading: parts[0].trim(), // The part before the first dash
                details: parts[1].trim(), // The part after the dash
              }
            : {
                // Handle cases where no dash is found
                heading: line.trim(),
                details: "",
              };
        });
    }

    if (section.startsWith("**Note:**")) {
      parsedData.note = section.replace("**Note:**", "").trim();
    }
  });

  return parsedData;
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
        <h3>Healing Recommendations</h3>
        <div className="recommendation-content">
          <h4>Possible Causes:</h4>
          <ol>
            {parsedData.possibleCauses.map((cause, index) => (
              <li key={index}>{cause}</li>
            ))}
          </ol>

          <h4>Symptoms:</h4>
          <ul>
            {parsedData.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>

          <h3>Recommended Treatment:</h3>
          <ul>
            {parsedData.treatment.map((item, index) => (
              <li key={index}>
                <strong>{item.heading}:</strong> {item.details}
              </li>
            ))}
          </ul>

          <p className="note">
            <strong>Note:</strong> {parsedData.note}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;

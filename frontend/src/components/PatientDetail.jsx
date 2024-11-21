import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  return (
    <div className="patient-detail">
      <h2>{patient.patient_name}</h2>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Date:</strong> {new Date(patient.date).toLocaleDateString()}</p>
      <p><strong>Symptoms:</strong> {patient.symptoms}</p>
      <p><strong>Transcription:</strong> {patient.transcription}</p>
    </div>
  );
};

export default PatientDetail;

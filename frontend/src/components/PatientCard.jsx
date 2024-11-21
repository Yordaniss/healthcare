import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PatientCard.css";

const PatientCard = ({ patient }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/patients/${patient.id}`);
  };

  return (
    <div className="patient-card" onClick={handleClick}>
      <h3>{patient.patient_name}</h3>
      <p>Date: {new Date(patient.date).toLocaleDateString()}</p>
    </div>
  );
};

export default PatientCard;

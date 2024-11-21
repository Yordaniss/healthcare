import React, { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import { Link } from 'react-router-dom';
import "../styles/PatientList.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/patients");
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="patient-list">
      <div className="patient-list-header">
        <h1>Patient Summaries</h1>
        <Link to="/upload">Upload New Audio</Link>
      </div>
      <div className="patient-list-cards">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
};

export default PatientList;
  
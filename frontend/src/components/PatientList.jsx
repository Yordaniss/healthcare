import React, { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import "../styles/PatientList.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        setSelectedFile(null);
        const updatedPatients = await fetch("http://localhost:5000/patients").then((res) =>
          res.json()
        );
        setPatients(updatedPatients); // Refresh patient list
      } else {
        alert("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="patient-list">
      <div className="patient-list-header">
        <h1>Patient Summaries</h1>
        <div className="upload-section">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <button onClick={handleFileUpload} className="upload-button">
            Upload Audio
          </button>
        </div>
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

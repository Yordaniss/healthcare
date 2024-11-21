import React from "react";
import PatientList from "../components/PatientList";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Patient Summaries</h1>
      <PatientList />
    </div>
  );
};

export default HomePage;

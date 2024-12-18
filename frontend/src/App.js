import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

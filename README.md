# Patient Management System

This project is a **Patient Management System** designed to handle patient records, process audio inputs for medical transcription, and provide symptom-based treatment recommendations. The application leverages modern React components for the frontend and integrates APIs for intelligent analysis.

---

## Features

### Core Functionality
- **Patient List View**:
  - Displays a list of all patients with their summaries in a responsive, card-based layout.
  - Allows users to browse and view patient details.

- **Patient Details View**:
  - Displays comprehensive information about a patient, including:
    - Name
    - Age
    - Recorded symptoms
    - Date of consultation
    - Transcription and parsed medical recommendations.

- **File Upload**:
  - Accepts audio files for transcription.
  - Automatically updates the patient list with new data upon successful file upload.

### Intelligent AI and Audio Processing
- **AssemblyAI Integration**:
  - Converts audio files into text using the AssemblyAI transcription service.
  - Extracts meaningful details such as:
    - Patient name
    - Age
    - Symptoms
    - Consultation date

- **Cloudflare AI Integration**:
  - Processes symptoms via Cloudflare AI to generate possible causes and actionable treatment recommendations.

---

## Technologies Used

### Frontend
- **React**: Component-based UI development.
- **CSS**: Responsive design with custom styling for cards, buttons, and layouts.
- **React Router**: Navigation between Patient List and Patient Details pages.

### Backend
- **Node.js & Express**: Handles API endpoints and serves data to the frontend.
- **AssemblyAI API**: Transcribes audio files into text for further analysis.
- **Cloudflare AI API**: Processes symptoms for recommendations.
- **PostgreSQL**: Stores patient data such as name, age, symptoms, and recommendations.
- **Docker**: Simplifies database deployment and management.

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or later)
- **npm** (or **yarn**)
- **PostgreSQL** (via Docker or local installation)
- API access credentials for **AssemblyAI** and **Cloudflare AI**.

### Installation

1. **Clone the repository**:
   ```
   bash
   git clone https://github.com/your-username/patient-management-system.git
   cd patient-management-system
   ```
2. **Install dependencies**:
   ```
   npm install
   ```
3. **Set up environment variables**:
- Create a .env file in the root directory and populate it with
   ```
   PG_USER
   PG_HOST
   PG_DATABASE
   PG_PASSWORD
   PG_PORT
   ASSEMBLY_AI_KEY
   ACCOUNT_ID
   CLOUDFLARE_API_KEY
   ```
4. **Set up PostgreSQL with Docker**:
- Run the following command to start PostgreSQL in a Docker container
   ```
   docker run --name postgres-container -e POSTGRES_USER=yourusername -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=patients -p 5432:5432 -d postgres
   ```
5. **Run the backend server**:
   ```
   cd backend
   npm start
   ```
6. **Run the frontend**:
   ```
   cd frontend
   npm start
   ```
7. **Access the application at http://localhost:3000.**:


## License
This project is licensed under the MIT License. See the LICENSE file for details.
import express from 'express';
import multer from 'multer';
import { transcribeAudio } from './utils/transcription.js';
import { pool } from './db.js';
import cors from 'cors';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Upload endpoint
app.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    const audioPath = req.file.path;
    const { text, patientName, age, date, symptoms } = await transcribeAudio(audioPath);

    const query = `
      INSERT INTO healthcare_summary (patient_name, age, date, symptoms, transcription)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [patientName, age, date, symptoms, text];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing audio' });
  }
});

// Fetch all summaries
app.get('/summaries', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM healthcare_summary ORDER BY uploaded_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching summaries' });
  }
});

app.get('/patients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM healthcare_summary');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).send('Error fetching patients');
  }
});

app.get('/patients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM healthcare_summary WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Patient not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).send('Error fetching patient');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

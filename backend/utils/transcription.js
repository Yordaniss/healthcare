
import { AssemblyAI } from 'assemblyai';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const transcribeAudio = async (audioPath) => {
  try {
    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLY_AI_KEY,
    });

    const data = {
      audio: audioPath
    }

    //const transcription = await client.transcripts.transcribe(data);

    //const text = transcription.text;
    const text = 'Patient John Doe. Age 34. Date November 10, 2024. Symptoms reported persistent cough, occasional headaches.';
    const patientName = text.match(/Patient\s+([\w\s]+)\./i)?.[1];
    const age = parseInt(text.match(/Age\s+(\d+)\./i)?.[1], 10);
    const date = text.match(/Date\s+([\w\s,0-9]+)/i)?.[1];
    const symptoms = text.match(/Symptoms\s+reported\s+(.*)\./i)?.[1];

    return { text, patientName, age, date, symptoms };
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Transcription failed');
  }
};
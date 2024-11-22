
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: '../.env' });

const CLOUD_FLARE_URL = `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/ai/run/@cf/google/gemma-7b-it-lora`;

export const getRecommendations = async (symptoms) => {
    console.log('START GENERATING');
    try {
      const response = await axios.post(
        CLOUD_FLARE_URL,
        {
          messages: [
            { role: 'system', content: 
              `You are a friendly assistant in medical hospital.`
            },
            { role: 'user', content: 
              `Please provide recommendations based on symptoms ${symptoms} in following format:` +
              `* {first recommendation` +
              `* {second recommendation` +
              `* ...`},
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('STOP GENERATING');
  
      return response.data.result.response;
    } catch (error) {
      console.error('Error calling Cloudflare API:', error.response?.data || error.message);
      throw new Error('Failed to retrieve recommendations.');
    }
  };
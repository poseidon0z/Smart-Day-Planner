import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './src/.env' });

import cors from 'cors';

console.log('Gemini API Key:', process.env.GEMINI_API_KEY); // This should log your API key
import AIRoutes from './Routes/AIRoutes';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use('/AI/', AIRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});

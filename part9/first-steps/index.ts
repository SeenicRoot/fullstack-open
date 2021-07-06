import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    if (!req.query.height || !req.query.weight) {
      throw new Error('Missing height or weight');
    }

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Weight and height should be numbers');
    }
    if (height < 0 || weight < 0) {
      throw new Error('Weight and height cannot be less than 0');
    }

    res.send(calculateBmi(height, weight));
  }
  catch (exception) {
    res.status(400).json({ error: exception.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

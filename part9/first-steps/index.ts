import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.daily_exercise || !req.body.target) {
      throw new Error('Missing parameters');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (req.body.daily_exercise.find((d: any) => isNaN(d)) || isNaN(req.body.target)) {
      throw new Error('Malformatted parameters');
    }
    
    res.json(calculateExercise(req.body.daily_exercise, req.body.target));
  }
  catch (exception) {
    res.status(400).json({ error: exception.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

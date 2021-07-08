interface TrainingValues {
  target: number;
  trainingPeriod: Array<number>;
}

export const parseArgs = (args: Array<string>): TrainingValues => {
  const target = Number(args[2]);
  const restOfArgs = args.slice(3);
  const trainingPeriod = restOfArgs.map(d => Number(d));

  if (trainingPeriod.length < 2) {
    throw new Error('Not enough days in training period!');
  }
  if (trainingPeriod.find(d => isNaN(d)) || isNaN(target)) {
    throw new Error('Arguments have to be numbers.');
  }
  if (trainingPeriod.find(d => d < 0) || target < 0) {
    throw new Error('Arguments cannot be negative.');
  }
  
  return {
    target,
    trainingPeriod
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

export const calculateExercise = (trainingPeriod: Array<number>, target: number): Result => {
  const trainingDays = trainingPeriod.filter(d => d > 0).length;
  const average = trainingPeriod.reduce((prev, curr) => prev + curr) / trainingPeriod.length;
  const calculateRating = (): number => {
    if (average >= target) {
      return 3;
    }
    if (average > target * .7) {
      return 2;
    }
    return 1;
  };
  const rating = calculateRating();
  const getRatingDescription = (): string => {
    switch (rating) {
      case 3:
        return 'Well done! Your target was met!';
      case 2:
        return 'You almost did it! Just a bit more!';
      case 1:
        return 'You fucking suck!';
      default:
        throw new Error('Unhandled rating');
    }
  };
  const ratingDescription = getRatingDescription();
  const result = {
    periodLength: trainingPeriod.length,
    trainingDays,
    target,
    average,
    success: average >= target,
    rating,
    ratingDescription
  };
  return result;
};
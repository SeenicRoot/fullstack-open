interface BmiValues {
  height: number;
  weight: number;
}

export const parseArgs = (args: Array<string>): BmiValues => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }
  if (args.length > 4) {
    throw new Error('Too many arguments');
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Height and weight have to be numbers');
  }
  if (height <= 0 || weight <= 0) {
    throw new Error('Height and weight need to be valid values');
  }

  return {
    height,
    weight
  };
}

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  if (bmi < 15) {
    return 'Very severely underweight';
  }
  if (bmi < 16) {
    return 'Severely underweight';
  }
  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi < 25) {
    return 'Normal (healthy weight)';
  }
  if (bmi < 30) {
    return 'Overweight';
  }
  if (bmi < 35) {
    return 'Obese Class I (Moderately obese)';
  }
  if (bmi < 40) {
    return 'Obese Class II (Severely obese)';
  }
  if (bmi >= 40) {
    return 'Obese Class III (Very severely obese)';
  }
  return 'Problem';
}
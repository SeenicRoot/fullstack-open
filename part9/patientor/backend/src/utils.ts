import {
  NewPatient,
  Gender,
  NewEntry,
  Diagnosis,
  Discharge,
  HospitalEntry,
  OccupationalHealthcareEntry,
  SickLeave,
  HealthCheckEntry,
  HealthCheckRating,
  BaseEntry
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String; 
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Unrecognized or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newPatient;
};

const parseType = (type: unknown): string => {
  if (!type || !isString(type)) {
    throw new Error('Incorrect or missing type');
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis["code"]> | undefined => {
  if (!diagnosisCodes) {
    return undefined;
  }
  if (!Array.isArray(diagnosisCodes) || diagnosisCodes.find(d => !isString(d))) {
    throw new Error('Diagnosis codes must be an array of strings');
  }
  return diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Missing or incorrect criteria");
  }
  return criteria;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error("Missing discharge");
  }

  let date;
  let criteria;
  try {
    date = parseDate(discharge.date);
  }
  catch (e) {
    throw new Error('Missing or incorrect discharge date');
  }
  try {
    criteria = parseCriteria(discharge.criteria);
  }
  catch (e) {
    throw new Error('Missing or incorrect discharge criteria');
  }

  return {
    date,
    criteria
  };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Missing or incorrect employer name');
  }
  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  return Boolean(sickLeave.startDate && sickLeave.endDate);
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  if (!isSickLeave(sickLeave)) {
    throw new Error('Unrecognized sick leave');
  }
  return {
    startDate: sickLeave.startDate,
    endDate: sickLeave.endDate
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Unrecognized or missing health check rating');
  }
  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): NewEntry => {
  const baseEntry: Omit<BaseEntry, 'id'> = {
    type: parseType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
  };
  const diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  if (diagnosisCodes) {
    baseEntry.diagnosisCodes = diagnosisCodes;
  }

  switch (baseEntry.type) {
    case "Hospital":
      const hospitalEntry: Omit<HospitalEntry, 'id'> = {
        ...baseEntry,
        type: baseEntry.type,
        discharge: parseDischarge(object.discharge)
      };
      return hospitalEntry;
    case "OccupationalHealthcare":
      const occupationalHealthcareEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
        ...baseEntry,
        type: baseEntry.type,
        employerName: parseEmployerName(object.employerName),
      };
      const sickLeave = parseSickLeave(object.sickLeave);
      if (sickLeave) {
        occupationalHealthcareEntry.sickLeave = sickLeave;
      }
      return occupationalHealthcareEntry;
    case "HealthCheck":
      const healthCheckEntry: Omit<HealthCheckEntry, 'id'> = {
        ...baseEntry,
        type: baseEntry.type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
      return healthCheckEntry;
    default:
      throw new Error("Entry type is wrong");
  }
};

export default { toNewPatient, toNewEntry };
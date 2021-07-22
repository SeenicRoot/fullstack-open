import patients from "../../data/patients";
import { NonSensitivePatientData, NewPatient, Patient, Entry, NewEntry } from "../types";
import { v1 as uuid } from 'uuid';

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addNewPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (id: string, entry: NewEntry): Patient => {
  const patientIndex = patients.findIndex(p => p.id === id);
  if (patientIndex === -1) {
    throw new Error('User not found');
  }
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patients[patientIndex].entries.push(newEntry as Entry);
  return patients[patientIndex];
};

export default {
  getNonSensitivePatientData,
  getPatient,
  addNewPatient,
  addEntryToPatient
};
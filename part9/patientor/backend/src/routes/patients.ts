/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);
    const addedPatient = patientService.addNewPatient(newPatient);
    res.json(addedPatient);
  }
  catch (exception) {
    res.status(400).send(exception.message);
  }
});

router.get('/:id', (req, res) => {
  res.json(patientService.getPatient(req.params.id));
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    const newEntry = utils.toNewEntry(req.body);
    const updatedPatient = patientService.addEntryToPatient(id, newEntry);
    res.json(updatedPatient);
  }
  catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
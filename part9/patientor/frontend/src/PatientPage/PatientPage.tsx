import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Container, Header, Icon, List, Button } from 'semantic-ui-react';
import { NewEntry, Patient } from '../types';
import { useParams } from 'react-router-dom';
import { setPatient, useStateValue } from '../state';
import EntryDetails from './Entry';
import AddEntryForm from '../AddEntryForm/AddEntryForm';

const PatientPage = () => {
  const [formOpen, setFormOpen] = React.useState<boolean>(false);

  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        if (patientFromApi) {
          dispatch(setPatient(patientFromApi));
        }
      }
      catch (e) {
        console.error(e);
      }
    };
    if (!patient || patient.id !== id) {
      void fetchPatient();
    }
  }, [id]);

  if (!patient) {
    return null;
  }

  const submitNewEntry = async (values: NewEntry) => {
    try {
      if (values.diagnosisCodes && values.diagnosisCodes.length === 0) {
        delete values.diagnosisCodes;
      }
      switch (values.type) {
        case "HealthCheck":
          values.healthCheckRating = Number(values.healthCheckRating);
          break;
        case "OccupationalHealthcare":
          if (values.sickLeave) {
            if (!values.sickLeave.startDate || !values.sickLeave.endDate) {
              delete values.sickLeave;
            }
          }
      }
      const { data: patient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setPatient(patient));
      setFormOpen(false);
    }
    catch (e) {
      console.error(e.response?.data || 'Unknown Error');
    }
  };

  const Gender = () => {
    switch (patient.gender) {
      case "male":
        return (
          <Icon name="mars" />
        );
      case "female":
        return (
          <Icon name="venus" />
        );
      default:
        return null;
    }
  };
  return (
    <Container>
      <Header size="medium">{patient.name}{Gender()}</Header>
      <div>Occupation: {patient.occupation}</div>
      <div>SSN: {patient.ssn}</div>
      <div>Date of birth: {patient.dateOfBirth}</div>
      <Header size="small">Entries</Header>
      <Button onClick={() => setFormOpen(!formOpen)} size="mini">
        {formOpen ? "Close Form" : "Open Form"}
      </Button>
      <AddEntryForm
        onSubmit={submitNewEntry}
        onCancel={() => setFormOpen(false)}
        formOpen={formOpen}
      />
      {patient.entries && 
        <List celled relaxed>
          {patient.entries.map(e => (
            <EntryDetails key={e.id} entry={e} />
          ))}
        </List>
      }
    </Container>
  );
};

export default PatientPage;
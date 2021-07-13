import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';
import { setPatient, useStateValue } from '../state';
import EntryDetails from './Entry';

const PatientPage = () => {
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
      {patient.entries && 
        <List>
          {patient.entries.map(e => (
            <EntryDetails key={e.id} entry={e} />
          ))}
        </List>
      }
    </Container>
  );
};

export default PatientPage;
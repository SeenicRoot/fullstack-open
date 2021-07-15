import React from 'react';
import { List, Icon, Item } from 'semantic-ui-react';
import { Entry, Diagnosis, OccupationalHealthcareEntry, HealthCheckEntry, HospitalEntry, HealthCheckRating, assertNever } from '../types';
import { useStateValue } from '../state';

const DiagnosisCodes = ({ list }: {list: Array<Diagnosis["code"]>}) => {
  const [{ diagnoses }] = useStateValue();

  if (!diagnoses) {
    return null;
  }
  return (
    <List bulleted>
      {list.map((dc, i) => (
        <List.Item key={i}>
          {dc} {diagnoses[dc] && diagnoses[dc].name}
        </List.Item>
      ))}
    </List>
  );
};

const OccupationalHealthcareEntryDetails = ({ entry }: {entry: OccupationalHealthcareEntry}) => (
  <List.Item>
    <Item.Header>{entry.date}<Icon name="black tie" /><i>{entry.employerName}</i></Item.Header>
    <Item.Description><i>{entry.description}</i></Item.Description>
    {entry.diagnosisCodes && <DiagnosisCodes list={entry.diagnosisCodes} />}
    {entry.sickLeave && <Item.Extra>Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Item.Extra>}
  </List.Item>
);

const HospitalEntryDetails = ({ entry }: {entry: HospitalEntry}) => (
  <List.Item>
    <Item.Header size="small">{entry.date}<Icon name="hospital" /></Item.Header>
    <Item.Description><i>{entry.description}</i></Item.Description>
    {entry.diagnosisCodes && <DiagnosisCodes list={entry.diagnosisCodes} />}
  </List.Item>
);

const HealthCheckEntryDetails = ({ entry }: {entry: HealthCheckEntry}) => {
  const rating = () => {
    switch (entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        return (
          <Icon name="heart" color="green" />
        );
      case HealthCheckRating.LowRisk:
        return (
          <Icon name="heart" color="yellow" />
        );
      case HealthCheckRating.HighRisk:
        return (
          <Icon name="heart" color="red" />
        );
      case HealthCheckRating.CriticalRisk:
        return (
          <Icon name="heartbeat" color="black" />
        );
    }
  };

  return (
    <List.Item >
      <Item.Header size="small">{entry.date}<Icon name="stethoscope" /></Item.Header>
      <Item.Description><i>{entry.description}</i></Item.Description>
      {entry.diagnosisCodes && <DiagnosisCodes list={entry.diagnosisCodes} />}
      <Item.Extra>{rating()}</Item.Extra>

    </List.Item>
  );
};

const EntryDetails = ({ entry }: {entry: Entry}) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
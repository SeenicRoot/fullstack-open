import React from 'react';
import { List } from 'semantic-ui-react';
import { Entry, Diagnosis } from '../types';

const DiagnosisCodes = ({ list }: {list: Array<Diagnosis["code"]>}) => {
  return (
    <List bulleted>
      {list.map((dc, i) => (
        <List.Item key={i}>
          {dc}
        </List.Item>
      ))}
    </List>
  );
};

const EntryDetails = ({ entry }: {entry: Entry}) => {
  return (
    <List.Item key={entry.id}>
      <div>{entry.date} <i>{entry.description}</i></div>
      {entry.diagnosisCodes && <DiagnosisCodes list={entry.diagnosisCodes} />}
    </List.Item>
  );
};

export default EntryDetails;
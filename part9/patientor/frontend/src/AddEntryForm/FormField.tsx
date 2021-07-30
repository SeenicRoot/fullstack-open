import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'formik';
import { Entry, HealthCheckRating } from '../types';

export type EntryTypeOption = {
  value: Entry["type"];
  label: string;
};

export type HealthRatingOption = {
  value: HealthCheckRating;
  label: string;
};

type SelectTypeFieldProps = {
  name: string;
  label: string;
  options: Array<{value: string | number, label: string}>;
};

export const SelectTypeField = ({
  name,
  label,
  options
}: SelectTypeFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);


import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FormGroup, Grid, Button } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { NewEntry, HealthCheckRating } from '../types';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { EntryTypeOption, HealthRatingOption, SelectTypeField } from './FormField';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
  formOpen: boolean;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" }
];

const healthRatingOptions: HealthRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const AddEntryForm = ({ onSubmit, onCancel, formOpen }: Props) => {
  const [{ diagnoses }] = useStateValue();

  if (!formOpen) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={values => {
        console.log(values);
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        switch (values.type) {
          case "HealthCheck":
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
            break;
          case "Hospital":
            break;
          case "OccupationalHealthcare":
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            break;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values, setValues }) => {
        const [entryFields, setEntryFields] = React.useState(<></>);

        const {
          type,
          date,
          description,
          specialist,
          diagnosisCodes
        } = values;

        React.useEffect(() => {
          switch (type) {
            case "HealthCheck":
              setValues({
                type,
                description,
                date,
                specialist,
                diagnosisCodes,
                healthCheckRating: HealthCheckRating.Healthy
              });
              setEntryFields(
                <SelectTypeField
                  label="Health Rating"
                  name="healthCheckRating"
                  options={healthRatingOptions}
                />
              );
              break;
            case "Hospital":
              setValues({
                type,
                description,
                date,
                specialist,
                diagnosisCodes,
                discharge: {
                  date: "",
                  criteria: ""
                }
              });
              setEntryFields(
                <>
                  <h4>Discharge</h4>
                    <FormGroup widths="equal">
                      <Field
                        label="Date"
                        placeholder="Date"
                        name="discharge.date"
                        component={TextField}
                        validate={requiredValidation}
                      />
                      <Field
                        label="Criteria"
                        placeholder="Criteria"
                        name="discharge.criteria"
                        component={TextField}
                        validate={requiredValidation}
                      />
                    </FormGroup>
                </>
              );
              break;
            case "OccupationalHealthcare":
              setValues({
                type,
                description,
                date,
                specialist,
                diagnosisCodes,
                employerName: "",
                sickLeave: {
                  startDate: "",
                  endDate: ""
                }
              });
              setEntryFields(
                <>
                  <Field
                    label="Employer"
                    placeholder="Employer"
                    name="employerName"
                    component={TextField}
                  />
                  <h4>Sick Leave (optional)</h4>
                  <FormGroup widths="equal">
                    <Field
                      label="Start Date"
                      placeholder="Start Date"
                      name="sickLeave.startDate"
                      component={TextField}
                    />
                    <Field
                      label="End Date"
                      placeholder="End Date"
                      name="sickLeave.endDate"
                      component={TextField}
                    />
                  </FormGroup>
                </>
              );
              break;
          }
        }, [type]);

        const requiredValidation = (value: unknown) => {
          const requiredError = "Field is required";
          if (!value) {
            return requiredError;
          }
        };
      
        return (
          <Form className="form ui">
            <SelectTypeField
              label="Type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {entryFields}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
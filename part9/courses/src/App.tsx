import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescription {
  type: 'special',
  requirements: string[]
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({header}: {header: string}) => (
  <h1>{header}</h1>
)

const Part = ({coursePart}: {coursePart: CoursePart}) => {
  const headerStyle = {
    margin: 0
  }
  const partStyle = {
    marginBottom: '10px'
  }

  switch (coursePart.type) {
    case 'normal':
      return (
        <div style={partStyle}>
          <h4 style={headerStyle}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <div><i>{coursePart.description}</i></div>
        </div>
      )
    case 'groupProject':
      return (
        <div style={partStyle}>
          <h4 style={headerStyle}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <div>Group projects: {coursePart.groupProjectCount}</div>
        </div>
      )
    case 'submission':
      return (
        <div style={partStyle}>
          <h4 style={headerStyle}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <div><i>{coursePart.description}</i></div>
          <div>Submit here: <a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a></div>
        </div>
      )
    case 'special':
      return (
        <div style={partStyle}>
          <h4 style={headerStyle}>{coursePart.name} {coursePart.exerciseCount}</h4>
          <div><i>{coursePart.description}</i></div>
          <div>Requirements: {coursePart.requirements.join(', ')}</div>
        </div>
      )
    default:
      return assertNever(coursePart);
  }
}

const Content = ({courseParts} : {courseParts: CoursePart[]}) => (
  <div>
    {courseParts.map((p, i) => (
      <Part key={i} coursePart={p} />
    ))}
  </div>
)

const Total = ({courseParts}: {courseParts: CoursePart[]}) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header header={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
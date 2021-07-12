import React from 'react';

const Header = ({header}: {header: string}) => (
  <h1>{header}</h1>
)

interface CoursePart {
  name: string,
  exerciseCount: number
}
const Content = ({courseParts} : {courseParts: CoursePart[]}) => (
  <div>
    {courseParts.map((p, i) => (
      <p key={i}>
        {p.name} {p.exerciseCount}
      </p>
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
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header header={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
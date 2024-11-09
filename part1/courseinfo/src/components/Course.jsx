const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ part }) => (
  <li>
    {" "}
    {part.name} {part.exercises}{" "}
  </li>
);

const Content = ({ parts }) => (
  <ul>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </ul>
);

const Total = ({ parts }) => (
  <p>
    Number of parts:{" "}
    {parts.map((part) => part.exercises).reduce((s, p) => s + p, 0)}
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;

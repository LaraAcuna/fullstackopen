
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const [p1, p2, p3] = props.parts;
  return (
    <div>
      <Part partname={p1.name} exercises={p1.exercises} />
      <Part partname={p2.name} exercises={p2.exercises} />
      <Part partname={p3.name} exercises={p3.exercises} />
    </div>
  )
}

const Total = (props) => {
  const [p1, p2, p3] = props.parts;
  return (
    <p>Number of exercises {p1.exercises + p2.exercises + p3.exercises}</p>
  );
}

const Part = (props) => {
  //console.log("Part loaded");
  return (
    <p>{props.partname} {props.exercises}</p>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [{
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    /*
      <div>
        <h1>{course}</h1>
        <p>
          {part1} {exercises1}
        </p>
        <p>
          {part2} {exercises2}
        </p>
        <p>
          {part3} {exercises3}
        </p>
        <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
      </div>
      */
  )
}
export default App;

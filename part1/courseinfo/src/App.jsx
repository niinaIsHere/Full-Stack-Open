
const Header = (course) => {
  return (
    <>
      <h1>{course.course}</h1>
    </>
  )
}

const Content = (parts) => {

  return (
    <>
    <p>
      {parts.parts[0].name} {parts.parts[0].exercises}
    </p>
    <p>
      {parts.parts[1].name} {parts.parts[1].exercises}
    </p>
    <p>
      {parts.parts[2].name} {parts.parts[2].exercises}
    </p>
    <Total e1={parts.parts[0].exercises} e2={parts.parts[1].exercises} e3={parts.parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}


export default App


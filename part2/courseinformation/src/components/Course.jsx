const Header = (props) => <h2>{props.course}</h2>

const Course = (course) => {  
  return (
  <div>
    <Header course={course.course.name} />
    <Content parts={course.course.parts} />
  </div>
  )
}

const Content = (props) => {
  const exercises =
    props.parts.map(part => part.exercises)
  const total =
    exercises.reduce((a, b) => a+b)

  return ( 
  <div>
    {props.parts.map(part => <Part key={part.id} part={part} />)}
    <Total total={total}/>
  </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p><b>total of {props.total} exercises</b></p>

export default Course

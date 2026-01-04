
const Header = () => {
  const course = 'Half Stack application development'
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = () => {

  const parts = [
    { name: 'Fundamentals of React', points: 10 },
    { name: 'Using props to pass data', points: 7 },
    { name: 'State of a component', points: 14 }    
  ]

  return (
    <div>
      <p>
        {parts[0].name} {parts[0].points}
      </p>
      <p>
        {parts[1].name} {parts[1].points}
      </p>
      <p>
        {parts[2].name} {parts[2].points}
      </p>
      <Total e1={parts[0].points} e2={parts[1].points} e3={parts[2].points} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
  )
}

const App = () => {
  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}

export default App


import { useState } from 'react'

const Display = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  const displayValue = props.name === 'positive' ? `${props.value} %` : props.value

  return (
    <tr>
      <td>{props.name}</td>
      <td>{displayValue}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
  <div>
    < StatisticLine name='good' value={props.good}/>
    < StatisticLine name='neutral' value={props.neutral}/>
    < StatisticLine name='bad' value={props.bad}/>
    < StatisticLine name='all' value={props.all}/>
    < StatisticLine name='average' value={props.average}/>
    < StatisticLine name='positive' value={props.positive}/>
  </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good-bad)/all
  const positive = all === 0 ? 0 : good/all * 100

  const handleGoodClick = () => {setGood(good + 1)}

  const handleNeutralClick = () => {setNeutral(neutral + 1)}

  const handleBadClick = () => {setBad(bad + 1)}

  return (
    <div>
      <Display title='give feedback'/>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Display title='statistic'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App

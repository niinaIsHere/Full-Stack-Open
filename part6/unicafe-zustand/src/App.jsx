import { useState } from 'react'
import Buttons from './components/Buttons'
import Statistics from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const all = good + bad + neutral
  const average = all === 0 ? 0 : ((good-bad)/all).toFixed(1)
  const positive = all === 0 ? 0 : (good/all * 100).toFixed(1)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }

  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  return (
    <>
      <h1>Unicafe</h1>
      <Buttons onGood={handleGood} onBad={handleBad} onNeutral={handleNeutral} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </>
  )
}

export default App

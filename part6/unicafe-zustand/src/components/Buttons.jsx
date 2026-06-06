const Buttons = ({ onGood, onBad, onNeutral }) => {
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={onGood}>good</button>
      <button onClick={onNeutral}>neutral</button>
      <button onClick={onBad}>bad</button>
    </div>
  )
}

export default Buttons

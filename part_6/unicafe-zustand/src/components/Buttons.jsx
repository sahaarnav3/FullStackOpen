import { useCounterControls } from "../store"

const Buttons = () => {
  const { goodIncrement, neutralIncrement, badIncrement } = useCounterControls()
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={goodIncrement}>good</button>
      <button onClick={neutralIncrement}>neutral</button>
      <button onClick={badIncrement}>bad</button>
    </div>
  )
}

export default Buttons

import { useState } from "react";

function App() {
  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button text="good" valueSetter={() => setGoodCount(goodCount + 1)} />
        <Button text="neutral" valueSetter={() => setNeutralCount(neutralCount + 1)} />
        <Button text="bad" valueSetter={() => setBadCount(badCount + 1)} />
      </div>
      <h1>statistics</h1>
      {goodCount || neutralCount || badCount ? (
        <Statistics
          goodCount={goodCount}
          neutralCount={neutralCount}
          badCount={badCount}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
}

const Statistics = ({ goodCount, neutralCount, badCount }) => {
  return (
    <div>
      <StatisticLine text="good" value={goodCount} />
      <StatisticLine text="neutral" value={neutralCount} />
      <StatisticLine text="bad" value={badCount} />
      <StatisticLine text="all" value={goodCount + badCount + neutralCount} />
      <StatisticLine text="average" value={(goodCount - badCount) / (goodCount + badCount + neutralCount)} />
      <StatisticLine text="positive" value={(goodCount / (goodCount + badCount + neutralCount)) * 100} />
    </div>
  );
};

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value} {text === "positive" ? "%" : ""}</p>
  )
}

const Button =({text, valueSetter}) => {
  return (
    <button onClick={valueSetter}>{text}</button>
  )
}

export default App;

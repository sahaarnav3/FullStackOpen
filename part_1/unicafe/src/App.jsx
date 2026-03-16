import { useState } from "react";

function App() {
  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGoodCount(goodCount + 1)}>good</button>
        <button onClick={() => setNeutralCount(neutralCount + 1)}>
          neutral
        </button>
        <button onClick={() => setBadCount(badCount + 1)}>bad</button>
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
      <p>good {goodCount}</p>
      <p>neutral {neutralCount}</p>
      <p>bad {badCount}</p>
      <p>all {goodCount + badCount + neutralCount}</p>
      <p>
        average {(goodCount - badCount) / (goodCount + badCount + neutralCount)}
      </p>
      <p>
        positive {(goodCount / (goodCount + badCount + neutralCount)) * 100}%
      </p>
    </div>
  );
};

export default App;

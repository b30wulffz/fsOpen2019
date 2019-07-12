import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const total = good+neutral+bad;
    const avg = total ? ((good*1) + (neutral*0) + (bad*(-1)))/total : 0;
    const pos = total ? (good/total)*100 : 0;

    return (
    <div>
        <h1>give feedback</h1>
        <div>
            <button onClick={() => setGood(good+1)}>good</button>
            <button onClick={() => setNeutral(neutral+1)}>neutral</button>
            <button onClick={() => setBad(bad+1)}>bad</button>
        </div>
        <h1>statistics</h1>
        <div>
            good {good}
            <br />
            neutral {neutral}
            <br />
            bad {bad}
            <br />
            total {good+neutral+bad}
            <br />
            average {avg}
            <br />
            positive {pos} %
        </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
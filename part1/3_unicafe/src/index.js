import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    );
}

const Statistic = (props) => {
    return (
        <tr>
            <td>
                {props.text}
            </td>
            <td>
                {props.value}
            </td>
        </tr>
    );
}

const Statistics = (props) => {
    const {good, neutral, bad} = props;

    const total = good+neutral+bad;
    
    if(!total) {
        return (
            <>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </>
        );
    }

    else {
        const avg = total ? ((good*1) + (neutral*0) + (bad*(-1)))/total : 0;
        const pos = total ? (good/total)*100 : 0;
    
        return (
            <>
                <h1>statistics</h1>
                <div>
                    <table>
                        <Statistic text="good" value={good} />
                        <Statistic text="neutral" value={neutral} />
                        <Statistic text="bad" value={bad} />
                        <Statistic text="total" value={total} />
                        <Statistic text="average" value={avg} />
                        <Statistic text="positive" value={`${pos} %`} />
                    </table>
                </div>
            </>
        );
    }
}

const App = () => {
  // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
    <div>
        <h1>give feedback</h1>
        <div>
            <Button onClick={() => setGood(good+1)} text="good" />
            <Button onClick={() => setNeutral(neutral+1)} text="neutral" />
            <Button onClick={() => setBad(bad+1)} text="bad" />
        </div>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
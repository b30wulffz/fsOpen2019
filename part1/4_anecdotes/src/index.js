import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MaxVoted = (props) => {

    const maxValue = props.votes.reduce(function (a, b) {
        return ( a > b ? a : b );
    });

    const index = props.votes.indexOf(maxValue);

    return (
        <>
            <h1>Anecdote with most votes</h1>
            {props.anecdotes[index]}
            <br/>
            has {maxValue} votes
        </>
    );
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

    const addVote = () => () => {
        const tempVotes = [...votes];
        tempVotes[selected]+=1;
        setVotes(tempVotes);
    }

    const randomSelector = () => setSelected(Math.floor(Math.random()*props.anecdotes.length))
    
    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <br />
            has {votes[selected]} votes
            <br />
            <button onClick={addVote()}>vote</button>
            <button onClick={randomSelector}>next anecdote</button>
            <MaxVoted anecdotes={props.anecdotes} votes={votes}/>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
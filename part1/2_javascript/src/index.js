import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (<h1>{props.course}</h1>);
}

const Part = (props) => {
    return (
        <p>
            {props.data} {props.exercise}
        </p>
    );
}

const Content = (props) => {
    const parts = props.parts.map(part=>{
        return (<Part data={part.name} exercise={part.exercises} />);
    })
    return (
        <div>
            {parts}
        </div>
    );
}

const Total = (props) => {
    const sum = props.parts.reduce((total,part) =>{
        return total+(part.exercises);
      }, 0);
    return (
        <p>Number of exercises {sum}</p>
    );
}

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ];

  return (
    <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
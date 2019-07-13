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

const Content = ({parts}) => {
    const data=parts.map(part => <Part key={part.id} data={part.name} exercise={part.exercises} />);
    return (
        <div>
            {data}
        </div>
    );
}

const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => {
        return (sum+part.exercises);
    }, 0);
    return (
        <p><b>total of {total} exercises</b></p>
    );
}

const Course = ({course}) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </>
    );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
        <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
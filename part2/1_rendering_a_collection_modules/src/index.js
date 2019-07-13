import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (<h2>{props.course}</h2>);
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

const Course = ({courses}) => {
    const data = courses.map(
        course => {
            return (  
                <>
                    <Header course={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts}/>
                </>
            );
        }
    )
    return (
        <>
            <h1>Web development curriculum</h1>
            {data}
        </>
    );
}

const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
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
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

  return (
    <div>
        <Course courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
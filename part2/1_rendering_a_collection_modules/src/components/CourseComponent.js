import React from 'react'

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
                <React.Fragment key={course.id}>
                    <Header course={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts}/>
                </React.Fragment>
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

export default Course;
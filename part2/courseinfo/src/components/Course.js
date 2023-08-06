const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
    return (
        <p>
            Number of exercises {parts.reduce((accumulator, part) => accumulator + part.exercises, 0)}
        </p>
    );
}

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}


const Course = ({ course }) => {
    const { name, parts } = course
    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course
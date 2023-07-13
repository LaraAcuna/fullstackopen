import { useState } from 'react'

const proportionHandler = (value, total) => {
  if (value === 0)
    return 0
  return value / total * 100
}

const Button = ({ clickHandler, text }) => (<button onClick={clickHandler}>{text}</button>)
const StatisticLine = ({ text, value }) => (<p>{text} {value}</p>)

const Statistics = (props) => {
  const { good, neutral, bad, average, positive, total } = props.values
  if (total === 0)
    return (<p>No feedback given</p>)
  return (
    <div>
      <h3>Statistics</h3>
      <table>
        <tbody>
          <tr>
            <td>good</td><td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td><td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td><td>{bad}</td>
          </tr>
          <tr>
            <td>all</td><td>{total}</td>
          </tr>
          <tr>
            <td>average</td><td>{proportionHandler(average, total)}</td>
          </tr>
          <tr>
            <td>positive</td><td>{`${proportionHandler(positive, total)}%`}</td>
          </tr>
        </tbody>
      </table>
      {/*
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={proportionHandler(average, total)} />
      <StatisticLine text="positive" value={`${proportionHandler(positive, total)}%`} />
  */}
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [total, setTotal] = useState(0)
  const [positive, setPositive] = useState(0)

  const giveGoodFeedback = () => {
    let newGood = good + 1;
    console.log("Giving good feedback")
    setGood(newGood)
    setAverage(average + 1)
    setTotal(newGood + neutral + bad)
    setPositive(positive + 1)
  }

  const giveNeutralFeedback = () => {
    let newNeutral = neutral + 1
    console.log("Giving neutral feedback")
    setNeutral(newNeutral)
    setTotal(good + newNeutral + bad)
  }

  const giveBadFeedback = () => {
    let newBad = bad + 1
    console.log("Giving bad feedback")
    setBad(newBad)
    setAverage(average - 1)
    setTotal(good + neutral + newBad)
  }

  const values = {
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'average': average,
    'total': total,
    'positive': positive
  }

  return (
    <div>
      <h3>Give Feedback</h3>
      <Button clickHandler={giveGoodFeedback} text="good" />
      <Button clickHandler={giveNeutralFeedback} text="neutral" />
      <Button clickHandler={giveBadFeedback} text="bad" />
      <Statistics values={values} />
    </div>
  )
}

export default App;

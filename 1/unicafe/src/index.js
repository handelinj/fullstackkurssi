import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
    const total = good+bad+neutral
    const average = (good-bad)/total
    const positive = (good/total*100) + "%"
    if(good + neutral + bad === 0) {
        return (
            <p>Ei tilastoja</p>
        )
    } else {
        return (
            <table>
                <tbody>
                    <Statistic text="hyvä" value={good}/>
                    <Statistic text="neutraali" value={neutral}/>
                    <Statistic text="huono" value={bad}/>
                    <Statistic text="yhteensä" value={total}/>
                    <Statistic text="keskiarvo" value={average}/>
                    <Statistic text="positiivisia" value={positive}/>
                </tbody>
            </table>
        )
    }
}
const Statistic = ({text, value}) => (
    <tr>
    <td>{text}</td><td>{value}</td>
    </tr>
)

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const rateGood = () => () => setGood(good+1)
  const rateNeutral = () => () => setNeutral(neutral+1)
  const rateBad = () => () => setBad(bad+1)
  return (
    <div>
        <h1>anna palautetta</h1>
        <Button handleClick={rateGood()} text='hyvä'/>
        <Button handleClick={rateNeutral()} text='neutraali'/>
        <Button handleClick={rateBad()} text='huono'/>
        
        <h1>statistiikka</h1>
        <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

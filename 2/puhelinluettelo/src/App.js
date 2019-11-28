import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Input = (props) => {
  const handleNameOnChange = (e) => {
    props.setNewName(e.target.value)
  }
  const handleNumberOnChange = (e) => {
    props.setNewNumber(e.target.value)
  }
  const addNewPerson = (e) => {
    e.preventDefault()
    if(props.newName !== '' && props.newNumber !== '') {
      if(props.persons.map(person => person.name).indexOf(props.newName) === -1) {
      const newPerson = {
        name: props.newName,
        number: props.newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          props.setPersons(props.persons.concat(returnedPerson))
          props.setMessage(`Lisättiin ${returnedPerson.name}`)
          props.setMessageType('success')
          setTimeout(() => {
            props.setMessage(null)
            props.setMessageType('hidden')
          }, 5000)
          props.setNewName('')
          props.setNewNumber('')
        })
      

    } else {
      if(window.confirm(`${props.newName} on jo luettelossa, vaihdetaanko numeroa?`)) {
        const person = props.persons.find(p => p.name === props.newName)
        const changedPerson = {...person, number:props.newNumber}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            props.setPersons(props.persons.map(p => p.id !== person.id ? p : returnedPerson))
            props.setMessage(`Numero vaihdettiin onnistuneesti!`)
            props.setMessageType('success')
            setTimeout(() => {
              props.setMessage(null)
              props.setMessageType('hidden')
            }, 5000)
            props.setNewName('')
            props.setNewNumber('')
          })
      }
    }
    }
  }  
    return (
      <form>
        <div>
          nimi: <input value={props.newName} onChange={handleNameOnChange}/>
        </div>
        <div>
          puh: <input value={props.newNumber} onChange={handleNumberOnChange}/>
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>lisää</button>
        </div>
      </form>
    )
}
const Filter = (props) => {
  const handleFilterOnChange = (e) => {
    props.setFilterString(e.target.value)
  }
    return (
      <div>
        <form>
          <div>
            rajaa näytettäviä: <input value={props.filterString} onChange={handleFilterOnChange}/>
          </div>
        </form>
      </div>
    )
}
const NumberInformation = (props) => {
  const filteredPersons = props.filterString !== '' ?
  props.persons.filter(person => person.name.toUpperCase().includes(props.filterString.toUpperCase())) :
  props.persons
  const removePerson = person => {
    if(window.confirm(`Poistetaanko ${person.name}`))
    personService
      .remove(person.id)
      .then(returnedPerson => {
        props.setPersons(props.persons.filter(p => p.id !== person.id))
        props.setMessage(`Poistettiin ${person.name}`)
        props.setMessageType('success')
        setTimeout(() => {
          props.setMessage(null)
          props.setMessageType('hidden')
        }, 5000)
      })
      .catch(error => {
        console.log(error)
        props.setMessage(`${person.name} oli jo poistettu`)
        props.setMessageType('error')
        setTimeout(() => {
          props.setMessage(null)
          props.setMessageType('hidden')
        }, 5000)
        props.setPersons(props.persons.filter(p => p.name !== person.name))
      })

  }
  return (
  filteredPersons.map(person => 
      <div key={person.name}>{person.name} {person.number} <button onClick={() => removePerson(person)}>poista</button></div>
    )
  )
}
const Message = (props) => (
  <div className={props.type}>
    {props.message}
  </div>
)


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('hidden')
  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Message message={message} type={messageType}/>
      <Filter filterString={filterString} setFilterString={setFilterString}/>
      <h3>lisää uusi</h3>
      <Input 
      persons={persons} setPersons={setPersons} 
      newName={newName} setNewName={setNewName}
      newNumber={newNumber} setNewNumber={setNewNumber}
      setMessage={setMessage}
      setMessageType={setMessageType}
      />
      <h2>Numerot</h2>
      <NumberInformation 
      persons={persons} setPersons={setPersons}
      filterString={filterString}
      setMessage={setMessage}
      setMessageType={setMessageType}
      />
    </div>
  )

}

export default App
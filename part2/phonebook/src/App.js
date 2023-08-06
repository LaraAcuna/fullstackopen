import { useState, useEffect } from 'react'
import axios from 'axios'
import personServices from './services/persons'

const Filter = ({ value, onChangeHandler }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChangeHandler} />
    </div>
  )
}

const NewContactForm = ({ params }) => {
  const { submitHandler, newName, nameChangeHandler, newNumber, numberChangeHandler } = params
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input value={newName} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ id, name, number, removeFunction }) => {
  return (
    <p>{name} {number} <button onClick={() => removeFunction(id, name)}>delete</button></p>
  )
}

const PeopleList = ({ filtered, removeFunction }) => {
  return (
    <div>
      {
        filtered.map(person => <Person removeFunction={removeFunction} key={person.id} name={person.name} id={person.id} number={person.number} />)
      }
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null)
    return null
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personServices
        .remove(id)
        .then(returned => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`Deleted ${name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const previousPerson = getPersonFromName()
    if (previousPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personServices
          .update(previousPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === previousPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            setNotification(`Edited ${returnedPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setError(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== previousPerson.id))
          })
      }
    } else {
      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => { setNotification(null) }, 5000)
        })
    }
  }

  const getPersonFromName = () => persons.find(person => person.name === newName)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
    setNameSearch(event.target.value)
  }

  const filtered = persons.filter((person) => person.name.toLowerCase().includes(nameSearch.toLowerCase()))
  //submitHandler, newName, nameChangeHandler, newNumber, numberChangeHandler
  const formData = {
    submitHandler: addName,
    newName: newName,
    newNumber: newNumber,
    nameChangeHandler: handleNameChange,
    numberChangeHandler: handleNumberChange
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter value={nameSearch} onChangeHandler={handleNameSearch} />
      <h3>Add a new</h3>
      <NewContactForm params={formData} />
      <h3>Numbers</h3>
      <PeopleList filtered={filtered} removeFunction={removePerson} />
    </div>
  );
}

export default App;

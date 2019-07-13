import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const updateName = (event) => {
    setNewName(event.target.value);
  }

  const updateNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const addData = (event) => {
    event.preventDefault();
    
    if(persons.map( a => a.name).indexOf(newName) === -1) {
      const data = {
        name: newName,
        number: newNumber
      };
      const copy = [...persons];
      copy.push(data);
      setPersons(copy);
    }
    else {
      alert(`${newName} is already added to phonebook`);
    }
    
  }

  const printData = persons.map((person) => {
    return (
      <React.Fragment key={person.name}>
        {person.name} {person.number}
        <br />
      </React.Fragment>
    )
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addData}>
        <div>
          name: <input value={newName} onChange={updateName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={updateNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {printData}
      </div>
    </div>
  )
}

export default App
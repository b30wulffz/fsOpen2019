import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ displayPersons, setDisplayPersons ] = useState([...persons])
  

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
      setDisplayPersons([...persons])
    }
    else {
      alert(`${newName} is already added to phonebook`);
    }
    
  }

  const printData = displayPersons.map((person) => {
    return (
      <React.Fragment key={person.name}>
        {person.name} {person.number}
        <br />
      </React.Fragment>
    )
  });

  const search = (event) => {
    setSearchName(event.target.value);
    const data = persons.filter(a=> a.name.toLowerCase().includes( searchName.toLowerCase() ));
    if(data.length === 0 && searchName.length === 0) {
      setDisplayPersons([...persons]);
    }
    else {
      setDisplayPersons([...data]);
    }
    
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input value={searchName} onChange={search} />
      </div>

      <h2>add a new</h2>
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
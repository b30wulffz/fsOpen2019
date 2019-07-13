import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const updateName = (event) =>{
    setNewName(event.target.value);
  }

  const addData = (event) => {
    event.preventDefault();
    const data = {
      name: newName
    };
    const copy = [...persons];
    copy.push(data);
    setPersons(copy);
  }

  const printData = persons.map((person) => {
    return (
      <React.Fragment key={person.name}>
        {person.name}
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
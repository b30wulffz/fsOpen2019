import React, { useState, useEffect } from 'react';
import phoneService from './services/phonebook';

const Filter = (props) => {
  return (
    <div>
      filter shown with<input value={props.value} onChange={props.onChange} />
    </div>
  );
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addData}>
      <div>
        name: <input value={props.newName} onChange={props.updateName} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.updateNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({printData}) => {
  return (
      <div>
        {printData}
      </div>
  );
}

const App = () => {

  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ displayPersons, setDisplayPersons ] = useState([...persons])
  
  
  useEffect(()=>{
    phoneService
      .getAll()
      .then(response=>{
        setPersons(response);
        setDisplayPersons(response);
      })
  },[]);

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

      phoneService
        .addNum(data)
        .then(response=>{
          const copy = [...persons];
          copy.push(response);
          setPersons(copy);
          setDisplayPersons(copy)
        })

      
    }
    else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const search = (event) => {
    const value = event.target.value;
    setSearchName(value);

    const data = persons.filter(a=> a.name.toLowerCase().includes( value.toLowerCase() ));
    if(data.length === 0 && value.length === 0) {
      setDisplayPersons(persons);
    }
    else {
      setDisplayPersons(data);
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

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchName} onChange={search} />

      <h3>add a new</h3>

      <PersonForm 
        newName={newName}
        updateName={updateName}
        newNumber={newNumber}
        updateNumber={updateNumber}
        addData={addData}
      />

      <h3>Numbers</h3>

      <Persons printData={printData}/>

    </div>
  )
}

export default App
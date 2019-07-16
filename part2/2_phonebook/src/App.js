import React, { useState, useEffect } from 'react';
import phoneService from './services/phonebook';
import './index.css'

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

const Notification = ({errorMessage, success}) => {
  if(errorMessage === null)
    return null;
  else {
    if(success) {
      return (
        <>
          <div className="message success">
            {errorMessage}
          </div>
          <br />
        </>
      )
    }
    else {
      return (
        <>
          <div className="message fail">
            {errorMessage}
          </div>
          <br />
        </>
      )
    }
  }
}

const App = () => {

  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ displayPersons, setDisplayPersons ] = useState([...persons])

  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ success, setSuccess ] = useState(false)
  
  
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

  const messageHandler = (msg, suc) => {
    setErrorMessage(msg);
    setSuccess(suc);

    setTimeout(()=>{
      setErrorMessage(null);
    }, 5000);

  }

  const addData = (event) => {
    event.preventDefault();
    const index = persons.map( a => a.name).indexOf(newName);

    if(index === -1) {
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
          setDisplayPersons(copy);
          messageHandler(`Added ${response.name}`, true);
        })
        .catch(error => {
          messageHandler(`${error}. Please try again.`, false);
        })

    }
    else {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if(confirm) {
        const updatedData = {
          ...persons[index],
          number: newNumber
        }

        phoneService
          .updateNum(updatedData)
          .then(response => {
            const copy = persons.map(person => (person.id !== response.id) ? person : response );
            setPersons(copy);
            setDisplayPersons(copy)
            messageHandler(`Updated ${response.name}`, true);
          })
          .catch(error => {
            messageHandler(`${error}. Person not found.`, false);
          })
      }
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

  const deleteRecord = (person) => () => {
    const confirm = window.confirm(`Delete ${person.name} ?`);
    if(confirm) {
      phoneService
        .deleteRec(person.id)
        .then(response=>{
          if(response.status === 200) {
            setPersons(persons.filter(name => name.id !== person.id));
            setDisplayPersons(displayPersons.filter(name => name.id !== person.id));
            messageHandler(`Details of ${person.name} were successfully deleted`, true);
          }
        })
        .catch(error => {
          messageHandler(`${error}. Person not found.`, false);
        })
    }
  } 

  const printData = displayPersons.map((person) => {
    return (
      <React.Fragment key={person.name}>
        {person.name} {person.number}&nbsp;
        <button onClick={deleteRecord(person)}>delete</button>
        <br />

      </React.Fragment>
    )
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification errorMessage={errorMessage} success={success} />

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
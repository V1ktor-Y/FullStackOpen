import { useEffect, useState } from "react";
import service from "./services/service";

const Person = ({ person, onClick }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => onClick(person)}>Delete</button>
    </div>
  );
};

const App = () => {
  const removePerson = (person) => {
    if (!confirm(`Are you sure you want to delete ${person.name} ?`)) return;
    service.deletePerson(person.id).then(() => {
      const newPersons = persons.filter((guy) => guy.name != person.name);

      setPersons(newPersons);
      setSearchPersons(newPersons);
    });
  };

  const addPerson = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };
    const personsMap = persons.map((person) => person.name, persons.number);
    if (personsMap.includes(person.name) === false) {
      service.post(person).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setSearchPersons(persons.concat(returnedPerson));
      });
      setNewName("");
      setNewNumber("");
    } else if (persons.find((guy) => guy.name === person.name && guy.number !== person.number) !== -1) {
      if (confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const personID = persons.find((guy) => guy.name === person.name).id;
        service.put(personID, person).then((returnedPerson) => {
          const newPersons = persons.map((guy) => (guy.name === person.name ? returnedPerson : guy));

          setPersons(newPersons);
          setNewName("");
          setNewNumber("");
          setSearchPersons(newPersons);
        });
      }
    } else {
      alert(`${person.name} with the number ${person.number} already exists :(`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    const txt = event.target.value.toLowerCase();
    setSearchPersons(persons.filter((person) => person.name.toLowerCase().startsWith(txt)));
  };

  const [persons, setPersons] = useState([]);
  const [searchPersons, setSearchPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    service.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setSearchPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Search</h2>
      <form>
        Search: <input onChange={handleSearchChange} />
      </form>
      <h2>Add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">ADD</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchPersons.map((person) => (
        <Person key={person.id} person={person} onClick={removePerson} />
      ))}
    </div>
  );
};

export default App;

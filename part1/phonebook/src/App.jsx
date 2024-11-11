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
      console.log(newPersons);

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
    if (persons.map((person) => person.name).includes(person.name) === false) {
      service.post(person).then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setSearchPersons(persons.concat(returnedNote));
      });
      setNewName("");
      setSearchPersons([]);
    } else {
      alert(`${person.name} already exists :(`);
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
    console.log("USE EFFECT");

    service.getAll().then((initialPersons) => {
      console.log(initialPersons);

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

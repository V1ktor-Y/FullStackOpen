import { useState } from "react";

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};
const App = () => {
  const addPerson = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };
    if (persons.map((person) => person.name).includes(person.name) === false) {
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
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
    setSearchPersons(
      persons.filter((person) => person.name.toLowerCase().startsWith(txt))
    );
  };

  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [searchPersons, setSearchPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;

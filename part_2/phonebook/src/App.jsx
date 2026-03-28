import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  function addPerson(e) {
    e.preventDefault();
    let personList = persons.map((person) => person.name.toLowerCase());
    if (personList.includes(newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }),
    );
    setNewName("");
    setNewNumber("");
  }

  const personsToShow =
    searchValue.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(searchValue.toLowerCase()),
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} setSearchValue={setSearchValue} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;

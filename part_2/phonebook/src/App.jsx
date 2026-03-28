import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  function addPersonToServer(e) {
    e.preventDefault();
    let personList = persons.map((person) => person.name.toLowerCase());
    if (personList.includes(newName.toLowerCase())) {
      const result = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );
      if (result) {
        const personDetails = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase(),
        );
        const newObject = { ...personDetails, number: newNumber };
        personService
          .update(personDetails.id, newObject)
          .then((data) => setPersons(persons.map(person => person.id === data.id ? {...person, number: data.number} : person)));
      }
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personService.create(personObject).then((data) => {
      setPersons(persons.concat({ ...personObject, id: data.id }));
      setNewName("");
      setNewNumber("");
    });
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
        addPerson={addPersonToServer}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        setPersons={setPersons}
        persons={persons}
      />
    </div>
  );
};

export default App;

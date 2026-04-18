import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
      // console.log("timeout triggered");
    }, 4000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [successMessage, errorMessage]);

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
          .then((data) => {
            setPersons(
              persons.map((person) =>
                person.id === data.id
                  ? { ...person, number: data.number }
                  : person,
              ),
            );
            setSuccessMessage(
              `Phone Number of ${newName} is changed to: ${newNumber}`,
            );
            setNewName("");
            setNewNumber("");
          })
          .catch(() =>
            setErrorMessage(
              `Information of ${newName} has been already removed from server`,
            ),
          );
      }
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personService
      .create(personObject)
      .then((data) => {
        setPersons(persons.concat({ ...personObject, id: data.id }));
        setSuccessMessage(
          `Person ${newName} with number ${newNumber} added successfully.`,
        );
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setErrorMessage(
          `Person Validation failed: name: ${error.response.data.error}`,
        );
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
      <Notification message={successMessage} />
      <ErrorNotification message={errorMessage} />
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

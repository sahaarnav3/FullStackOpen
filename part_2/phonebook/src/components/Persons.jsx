import personService from "../services/persons";

export default function Persons({ personsToShow, setPersons, persons }) {
  function deleteHandler({name, id}) {
    if(!confirm(`Delete ${name}`))
      return;
    personService
      .deletePerson(id)
      .then(data => {
        if (data == 204) {
          setPersons(persons.filter((person) => person.id !== id));
        }
      })
      .catch(() => alert("Person Doesn't Exist"));
  }
  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deleteHandler(person)}>Delete</button>
        </p>
      ))}
    </div>
  );
}

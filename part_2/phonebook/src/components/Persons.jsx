
export default function Persons({ personsToShow }) {
    return(
        <div>
        {personsToShow.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    )
}
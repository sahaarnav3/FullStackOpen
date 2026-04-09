const express = require("express");
const app = express();
const PORT = 3001;
const morgan = require('morgan');

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());
morgan.token('requestBody', function(req, res) {return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'));

app.get("/api/persons", (req, res) => {
  return res.send(persons);
});

app.get("/api/info", (req, res) => {
  const element = `<p>Phonebook has info for ${persons.length} people</p>
   <p>${Date()}</p>
  `;
  return res.send(element);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personData = persons.find((person) => person.id === id);
  if (personData) return res.json(personData);
  // return res.status(404).json({ error: "Person with given ID not found."});
  return res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/persons", (req, res) => {
  const personDetails = req.body;

  if (!personDetails) return res.status(400).json({ error: "Content Missing" });
  if (!personDetails.number)
    return res.status(400).json({ error: "Number is Missing" });
  if (!personDetails.name)
    return res.status(400).json({ error: "Name is Missing" });
  for (let person of persons) {
    if (person.name.toLowerCase() === personDetails.name.toLowerCase())
      return res
        .status(400)
        .json({
          error: "Name is Already Present. Try again with another name.",
        });
  }
  const person = {
    id: generateId(),
    name: personDetails.name,
    number: personDetails.number,
  };
  persons = persons.concat(person);
  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

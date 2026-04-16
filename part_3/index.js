const express = require("express");
const app = express();
app.use(express.static("dist"));
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");
require('dotenv').config();
const Person = require('./models/person');

let persons = [];
Person.find({}).then(response => {
  persons = response;
})

app.use(express.json());
morgan.token("requestBody", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :requestBody",
  ),
);

app.get("/api/persons", (req, res) => {
  return res.json(persons);
});

app.get("/api/persons/info", (req, res) => {
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
  return res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const personDetails = req.body;

  if (!personDetails) return res.status(400).json({ error: "Content Missing" });
  if (!personDetails.number)
    return res.status(400).json({ error: "Number is Missing" });
  if (!personDetails.name)
    return res.status(400).json({ error: "Name is Missing" });
  for (let person of persons) {
    if (person.name.toLowerCase() === personDetails.name.toLowerCase())
      return res.status(400).json({
        error: "Name is Already Present. Try again with another name.",
      });
  }
  const newPerson = new Person({
    name: personDetails.name,
    number: personDetails.number,
  });
  newPerson.save().then(response => {
    persons = persons.concat(newPerson);
    return res.json(response);
  })
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

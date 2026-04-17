const express = require("express");
const app = express();
app.use(express.static("dist"));
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");
require("dotenv").config();
const Person = require("./models/person");

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
  Person.find({}).then((persons) => {
    return res.json(persons);
  });
});

app.get("/api/persons/info", (req, res) => {
  let persons = [];
  Person.find({}).then((response) => {
    persons = response;
  });
  const element = `<p>Phonebook has info for ${persons.length} people</p>
   <p>${Date()}</p>
  `;
  return res.send(element);
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((response) => {
      if (response) {
        return res.json(response);
      } else {
        return res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (req, res) => {
  const personDetails = req.body;

  if (!personDetails) return res.status(400).json({ error: "Content Missing" });
  if (!personDetails.number)
    return res.status(400).json({ error: "Number is Missing" });
  if (!personDetails.name)
    return res.status(400).json({ error: "Name is Missing" });

  const newPerson = new Person({
    name: personDetails.name,
    number: personDetails.number,
  });
  newPerson.save().then((response) => {
    return res.json(response);
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findById(req.params.id)
    .then((person) => {
      if (!person) return res.status(404).end();

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson);
      });
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((response) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name == "CastError")
    return res.status(400).send({ error: "malformatted id" });

  next(error);
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

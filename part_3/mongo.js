const mongoose = require('mongoose')

const password = process.argv[2]
const userName = process.argv[3]
const userPhone = process.argv[4]

// console.log(password, userName, userPhone);

const url = `mongodb+srv://neoGStudent:${password}@neog.fc7jd.mongodb.net/fullstackopen?retryWrites=true&w=majority&appName=neoG`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (password && !userName && !userPhone) {
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
  return
}

const newPerson = new Person({
  name: userName,
  number: userPhone,
})

newPerson.save().then((result) => {
  console.log(result)
  console.log(`added ${userName} number ${userPhone} to phonebook`)
  mongoose.connection.close()
  return
})

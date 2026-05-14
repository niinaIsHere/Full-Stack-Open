const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@phonebook.hffiope.mongodb.net/?appName=phonebook`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const addPerson = (name, number) => {

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
    
}

const getAll = () => {
    Person.find({}).then(result => {
        console.log('phonebook:')
    result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
    })
}

if (process.argv.length == 3) {
    getAll()
}
else {
    const personName = process.argv[3]
    const personNumber = process.argv[4]
    
    addPerson(personName, personNumber)
}

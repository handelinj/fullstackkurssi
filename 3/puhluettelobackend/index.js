require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


morgan.token('data', function(req,res) {return JSON.stringify(req.body)})
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
/*let persons = [
    {
      "name": "Arto Hellas",
      "number": "045-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
     },
     {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }      
]
*/

app.get('/info', (req, res, next) => {
  Person.count().then(number => {
    const time = new Date()
    res.send(`
    <div>Phonebook has info for ${number} people.</div>
    <div>${time}</div>
    `)
  })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
  //res.json(persons)
  Person.find({}).then(people => {
    res.json(people)
  })
    .catch(error => next(error))
})
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id).then(person => {
    if(person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
  /*const person = persons.find(person => person.id === id)
  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }*/
})
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  /*persons = persons.filter(person => person.id !== id);*/
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name and number required'
    })
  }
  /*const found = persons.find(p => p.name === body.name)
  console.log(found)
  if(found) {
    return response.status(400).json({
      error: 'Name already exists'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.round(Math.random()*100000),
  }

  persons = persons.concat(person)

  response.json(person)
  */
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
    .catch(error => next(error))
})
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }


  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
const express = require('express')

const server = express()

server.use(express.json())


const projects = [{id: "1", title: 'Novo projeto', tasks: [] },{id: "2", title: 'Novo projeto 2', tasks: [] }]


//Middlewares

server.use((req, res, next) => {
  console.count('req')

  next ()
})

function VerifyId (req, res, next) {
  const project = projects[req.params.id]
  if(!project) {

    return res.status(400).json({ error: "Id required"})
  }

  return next()
}


// Routes

server.get('/projects/', (req, res) => {

  return res.json(projects)
})

server.get('/projects/:id',VerifyId, (req, res) => {
  const { id } = req.params
 
  return res.json(projects[id])
 })

server.post('/projects/', (req, res) => {
 const { project } = req.body

 projects.push(project)

 return res.json(projects)
})

server.post('/projects/:id/tasks', VerifyId, (req, res) => {
  const { id } = req.params
  const { tasks } = req.body

  projects[id].tasks.push(tasks)

  return res.json(projects[id])

})

server.put('/projects/:id',VerifyId, (req, res) => {
  const { id } = req.params
  const { project } = req.body

  projects[id] = project

  return res.status(200).json(projects[id])
})

server.delete('/projects/:id',VerifyId, (req, res) => {
  const { id } = req.params

  projects.splice(id, 1)

  return res.status(200).json({ note: `The project with id ${id} is deleted!`})
})


server.listen(3000)
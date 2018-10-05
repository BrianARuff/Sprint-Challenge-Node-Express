const express = require('express');

const projectRouter = express.Router();

const db = require('./data/helpers/actionModel');

projectRouter.get('/', (req, res) => {
  db.get()
    .then(projects => res.status(200).send(projects))
    .catch(err => res.status(500).send(err));
});

projectRouter.get('/:id', (req, res) => {
  const {id} = req.params;
  db.get(id)
    .then(singleProject => res.status(200).send(singleProject))
    .catch(err => res.status(500).send(err));
})

projectRouter.post('/', (req, res) => {
  const {project_id, description, notes, completed} = req.body;
  const newProject = {project_id, description, notes, completed};
  if(!project_id || !description || !notes || !completed) {
    res.status(422).send({error: "Please enter a project id, description, note, and completed value"})
    return;
  }
  db.insert(newProject)
    .then(postedProject => res.status(201).send(postedProject))
    .catch(err => res.status(500).send(err));
});

projectRouter.put('/:id', (req, res) => {
  const {id} = req.params;
  const {project_id, description, notes, completed} = req.body;
  const updatedProject = {project_id, description, notes, completed};
  if(!project_id || !description || !notes || !completed) {
    res.status(422).send({error: "Please enter a project id, description, note, and completed value"})
    return;
  }
  db.update(id, updatedProject)
    .then(project => res.status(200).send(project))
    .catch(err => res.status(500).send(err));
});

projectRouter.delete('/:id', (req, res) => {
  const {id} = req.params;
  db.remove(id)
    .then(deletedProject => res.status(204).send(deletedProject))
    .catch(err => res.status(500).send(err));
})

module.exports = projectRouter;
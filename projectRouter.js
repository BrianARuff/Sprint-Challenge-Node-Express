const express = require('express');

const projectRouter = express.Router();

const db = require('./data/helpers/actionModel');



projectRouter.get('/', (req, res) => {
  db.get()
    .then(projects => res.status(200).send(projects))
    .catch(err => res.status(500).send(err));
});

projectRouter.post('/', (req, res) => {
  const {project_id, description, notes, completed} = req.body;
  const newProject = {project_id, description, notes, completed};
  if(!project_id, description, notes, completed) {
    res.status(422).send({error: "Please enter a project id, description, note, and completed value"})
    return;
  }
  db.insert(newProject)
    .then(postedProject => res.status(201).send(postedProject))
    .catch(err => res.status(500).send(err));
})

module.exports = projectRouter;
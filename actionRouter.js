const express = require("express");

const actionRouter = express.Router();

const db = require("./data/helpers/actionModel");

actionRouter.get("/", (req, res) => {
  db.get()
    .then(actions => res.status(200).send(actions))
    .catch(err => res.status(500).send(err));
});

actionRouter.post("/", (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  const newAction = { project_id, description, notes, completed };
  db.insert(newAction)
    .then(action => res.status(201).send(action))
    .catch(err => res.status(500).send(err));
});

actionRouter.put('/:id', (req, res) => {
  const {id} = req.params;
  const { project_id, description, notes, completed} = req.body;
  const updatedAction = {project_id, description, notes, completed};
  if(!project_id || !description || !notes || !completed) {
    res.status(422).send({error: "Please enter a project id, description, note, and completed value"})
    return;
  }
  db.update(id, updatedAction)
    .then(action => res.status(200).send(action))
    .catch(err => res.status(500).send(err));
});

actionRouter.delete('/:id', (req, res) => {
  const {id} = req.params;
  db.remove(id)
    .then(action => res.status(204).sendStatus(204))
    .catch(err => res.status(500).send(err));
})

module.exports = actionRouter;

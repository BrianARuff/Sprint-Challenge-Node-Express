const express = require("express");

const actionRouter = express.Router();

const db = require("./data/helpers/actionModel");

actionRouter.get("/", (req, res) => {
  db.get()
    .then(actions => res.status(200).send(actions))
    .catch(err => res.status(500).send(err));
});

actionRouter.get("/:id", (req, res) => {
  const {id} = req.params;
  db.get(id)
    .then(action => res.status(200).send(action))
    .catch(err => res.status(500).send(err));
})

actionRouter.post("/", (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  const newAction = { project_id, description, notes, completed };
  if (typeof description !== "string") {
    res.status(422).send("Description must be a string");
    return;
  }
  if (typeof completed !== "boolean") {
    res.status(422).send("Completed must be a boolean value");
    return;
  }
  db.insert(newAction)
    .then(action => res.status(201).send(action))
    .catch(err => res.status(500).send(err));
});

actionRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes, completed } = req.body;
  const updatedAction = { project_id, description, notes, completed };
  if (!project_id || !description || !notes || !completed) {
    res
      .status(422)
      .send({
        error:
          "Please enter a  valid project id, description, note, and completed value"
      });
    return;
  }
  db.update(id, updatedAction)
    .then(action => res.status(200).send(action))
    .catch(err => res.status(500).send(err));
});

actionRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(action => res.status(200).send(`Action at id ${id} deleted`))
    .catch(err => res.status(500).send(err));
});

module.exports = actionRouter;

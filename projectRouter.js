const express = require("express");

const projectRouter = express.Router();

const db = require("./data/helpers/projectModel");

projectRouter.get("/", (req, res) => {
  db.get()
    .then(projects => res.status(200).send(projects))
    .catch(err => res.status(500).send(err));
});

projectRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(singleProject => res.status(200).send(singleProject))
    .catch(err => res.status(500).send(err));
});

projectRouter.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  db.getProjectActions(id)
    .then(project => res.status(200).send(project))
    .catch(err => res.status(500).send(err));
});

projectRouter.post("/", (req, res) => {
  const { description, name, completed } = req.body;

  const newProject = { description, name, completed };

  if (name && name.trim().length < 128) {
    res.status(422).send("Name must be at least 128 characters long");
    return;
  }

  if (description && typeof description !== "string") {
    res.status(422).send("Description must be a string");
  }

  if (completed && typeof completed !== "boolean") {
    res.status(422).send("Completed must be a boolean value");
  }

  db.insert(newProject)
    .then(postedProject => res.status(201).send(postedProject))
    .catch(err => res.status(500).send(err));
});

projectRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  
  const { description, name, completed } = req.body;

  const updatedProject = { description, name, completed };

  if (name && name.trim().length < 128) {
    res.status(422).send("Name must be at least 128 characters long");
    return;
  }

  if (description && typeof description !== "string") {
    res.status(422).send("Description must be a string");
  }

  if (completed && typeof completed !== "boolean") {
    res.status(422).send("Completed must be a boolean value");
  }

  db.update(id, updatedProject)
    .then(project => res.status(200).send(project))
    .catch(err => res.status(500).send(err));
});

projectRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(422).send(`Post not found at id ${id}`);
    return;
  }
  db.remove(id)
    .then(deletedProject => res.status(204).sendStatus(204))
    .catch(err => res.status(500).send(err));
});

module.exports = projectRouter;

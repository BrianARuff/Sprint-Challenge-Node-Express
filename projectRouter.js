const express = require("express");

// require router
const projectRouter = express.Router();

// require db helper functions
const db = require("./data/helpers/projectModel");

// require errorHandling
const validateName = require('./errorMiddleware');

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

projectRouter.post("/", validateName, (req, res) => {
  const { description, name, completed } = req.body;

  const newProject = { description, name, completed };

  if (!description) {
    res.status(422).send("Missing description");
    return;
  }

  if (typeof completed !== "boolean") {
    res.status(422).send("Completed must be a boolean value.");
    return;
  }

  if (name.length >= 128 || typeof name !== "string") {
    res.status(422).send("Name must not exceed 128 characters and must be a string");
    return;
  }

  if (typeof description !== "string") {
    res.status(422).send("Description must be a string");
    return;
  }

  db.insert(newProject)
    .then(postedProject => res.status(201).send(postedProject))
    .catch(err => res.status(500).send(err));
});

projectRouter.put("/:id", (req, res) => {
  const { id } = req.params;

  const { description, name, completed } = req.body;

  const updatedProject = { description, name, completed };
  console.log(id, updatedProject);

  db.update(id, updatedProject)
    .then(project => {
      console.log(project);
      res.status(200).send(project)
    })
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

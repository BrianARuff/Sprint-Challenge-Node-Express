const errors = {
  missingName: {
    status: 422,
    message: "Name is missing"
  },
  typeErrorName: {
    status: 422,
    message: "Name must be a string"
  }
}

function validateName(req, res) {
  const {name} = req.body;
  if(!name) {
    res.status(422).send(errors.missingName);
  }
  if(typeof name !== 'string') {
    res.status(422).send(errors.typeErrorName);
  }
}

module.exports = validateName;
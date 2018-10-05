const express = require('express');

// middle ware
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// routes
const projectRouter = require('./projectRouter');

// init server
const server = express();

// apply middlware
server.use(express.json(), cors(), morgan('dev'), helmet());

// use project routes
server.use('/projects', projectRouter);

// listener
server.listen(process.env.PORT, () => console.log(`\n=== API running on port ${process.env.PORT} ===\n`));
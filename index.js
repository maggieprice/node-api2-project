const express = require('express');
const server = express();
server.use(express.json())

const expressRouter = require("./ExpressRouter.js");
const port = 5000;

server.use("/api/posts", expressRouter);

server.listen(port, () => console.log(`\n** Server on port ${port} \n`));


const jsonServer = require("json-server");
const server = jsonServer.create();


const router = jsonServer.router({
  users: [],
  projects: [],
  tasks: []
});

const middlewares = jsonServer.defaults();

server.use(middlewares);

// Rewriter para tener rutas /api/...
server.use(
  jsonServer.rewriter({
    "/api/projects": "/projects",
    "/api/projects/:id": "/projects/:id",
    "/api/tasks": "/tasks",
    "/api/tasks/:id": "/tasks/:id",
    "/api/users": "/users",
    "/api/users/:id": "/users/:id",
  })
);

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running with in-memory DB 🚀");
});


module.exports = server;

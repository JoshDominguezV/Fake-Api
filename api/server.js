const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Rutas personalizadas
server.use(
  jsonServer.rewriter({
    "/api/projects": "/projects",
    "/api/projects/:id": "/projects/:id",
    "/api/tasks": "/tasks",
    "/api/tasks/:id": "/tasks/:id",
  })
);

server.use(router);

// Puerto dinámico de Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

// Exportar para compatibilidad
module.exports = server;

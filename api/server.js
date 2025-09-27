// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()




// Habilitar CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

server.use(middlewares)
// Add this before server.use(router)
// Configuración de rutas
server.use(jsonServer.rewriter({
  '/api/projects': '/projects',
  '/api/projects/:id': '/projects/:id',
  '/api/tasks': '/tasks',
  '/api/tasks/:id': '/tasks/:id'
}))



server.use('/api', router)

server.listen(3000, () => {
    console.log('JSON Server is running')
})
// Manejar rutas no encontradas
server.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

module.exports = server
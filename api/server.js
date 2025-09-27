const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// Datos iniciales en lugar de un archivo
const initialData = {
  projects: [
    { id: 1, name: "Proyecto 1", description: "Descripción del proyecto 1" }
  ],
  tasks: [
    { id: 1, projectId: 1, title: "Tarea 1", completed: false }
  ]
}

// Crear router con datos en memoria
const router = jsonServer.router(initialData)

// Habilitar CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

server.use(middlewares)

// Usar el rewriter
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))

server.use('/api', router)

// Ruta de salud
server.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' })
})

server.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' })
})

module.exports = server
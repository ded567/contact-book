const routes = require('./routes')

const port = 3000

const app = routes()
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
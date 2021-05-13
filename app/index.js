const server = require('./server')

const port = 3000

const ssl = false

server(ssl).listen(port, () => console.log(`Server running on port ${port} | SSL: ${ssl}`))
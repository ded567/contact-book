const express = require('express')
const cors = require('cors');
const consign = require('consign')
const https = require('https')
const path = require('path');
const fs = require('fs')

const privateKey  = fs.readFileSync(path.resolve('./app/server/server.key'), 'utf8')
const certificate = fs.readFileSync(path.resolve('./app/server/server.cert'), 'utf8')
const credentials = {key: privateKey, cert: certificate}

module.exports = (ssl = false) => {
    const app = express()
    
    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))
    
    consign()
        .include('app/controllers')
        .into(app)

    if (ssl)
        return https.createServer(credentials,app)
    
    return app
}
const db = require('../models')

module.exports = app => {

    app.get('/contacts', (req, res) => {

        db.Contacts.findAll().then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            return res.status(500).json(err.message)

        })

    })

    app.get('/contacts/:id', (req, res) => {

        const id = parseInt(req.params.id)

        db.Contacts.findByPk(id).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            return res.status(500).json(err.message)

        })

    })

}
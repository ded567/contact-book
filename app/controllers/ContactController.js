const db = require('../models')
const moment = require('moment')
const { Op } = require('sequelize');


module.exports = app => {

    app.get('/contacts', (req, res) => {

        const maxLimit = 30

        const id = parseInt(req.query.id)
        const firstName = req.query.firstName
        const lastName = req.query.lastName

        const createdAfter = req.query.createdAfter
        const createdBefore = req.query.createdBefore

        const updatedAfter = req.query.updatedAfter
        const updatedBefore = req.query.updatedBefore

        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)

        if (isNaN(page))
            page = 1

        if (isNaN(limit) || limit > maxLimit)
            limit = maxLimit

        let query = { 
            offset:((page-1)*limit),
            limit : limit,
            subQuery:false,
            where: {} 
        }

        if (!isNaN(id))
            query.where.id = id
        
        if (firstName != undefined && firstName.split(/\s/g).join('') != '')
            query.where.firstName = {
                [Op.like]: firstName
            }

        if (lastName != undefined && lastName.split(/\s/g).join('') != '')
            query.where.lastName = {
                [Op.like]: lastName
            }

        if (moment(createdAfter,'YYYY-MM-DD hh:mm:ss').isValid())
            query.where.createdAt = {
                [Op.between]: [createdAfter,( 
                    moment(createdBefore,'YYYY-MM-DD hh:mm:ss').isValid()?
                    createdBefore:
                    moment().format('YYYY-MM-DD HH:MM:SS'))
                ]
            }

        if (moment(updatedAfter,'YYYY-MM-DD hh:mm:ss').isValid())
            query.where.updatedAt = {
                [Op.between]: [updatedAfter,( 
                    moment(updatedBefore,'YYYY-MM-DD hh:mm:ss').isValid()?
                    updatedBefore:
                    moment().format('YYYY-MM-DD HH:MM:SS'))
                ]
            }

        db.Contacts.findAll(query).then(result => {

            return res.status(200).json({
                page: page,
                limit: limit,
                contacts: result
            })

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

    app.post('/contacts', (req, res) => {

        const newContact = req.body;

        if (newContact.firstName === undefined || newContact.firstName.split(/\s/g).join('') === '')
            return res.status(400).json('Please inform the First Name of the contact')

        db.Contacts.create(newContact).then(result => {

            return res.status(200).json(result)

        }).catch(err => {

            return res.status(500).json(err.message)

        })

    })

    app.patch('/contacts/:id', (req, res) => {

        const id = parseInt(req.params.id)
        const alteration = req.body;

        if (isNaN(id))
            return res.status(400).json('Invalid Contact')

        db.Contacts.update(alteration,
            {returning: true, where: {id: id} }).then(result => {
            
                db.Contacts.findByPk(id).then(result => {

                    return res.status(200).json(result)
        
                }).catch(err => {

                    return res.status(500).json(err.message)
        
                })

        }).catch(err => {

            return res.status(500).json(err.message)

        })

    })

    app.delete('/contacts/:id', (req, res) => {

        const id = parseInt(req.params.id)

        if (isNaN(id))
            return res.status(400).json('Invalid Contact')

        db.Contacts.destroy( {where: {id: id} }).then(result => {

            db.Contacts.findByPk(id).then(result => {

                if (result == null)
                    return res.status(200).json(`Contact ${id} removed`)
                
                return res.status(400).json(`Can't removed ${id}, an error has occured during the operation`)
    
            })

        }).catch(err => {

            return res.status(500).json(err.message)

        })

    })

}
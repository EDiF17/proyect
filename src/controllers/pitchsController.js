
const db = require('../database/models')

const { validationResult } = require('express-validator');
const { DATE } = require('sequelize');
const { Op } = require('sequelize');

const controller = {
    
    //ALL PITCHS 

    // async index(req, res) {
    //         try {
    //             const pitchs = await db.Pitch.findAll({
    //                 include: [
    //                     'countries',
    //                 ]
    //             });
    //             res.render('pitchs/pitchs', { pitchs });
    //         } catch (error) {
    //             res.status(500).send(error);
    //         }
    //     },
    
    // FORM TO CREATE PITCH 
    create (req, res) {
        return res.render('pitchs/newPitchs');
    },

    // METHOD TO NEW PITCH 
    async newPitch (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('pitchs/newPitchs', {
                    errors: errors.mapped(),
                    oldData: req.body
                });
            }
        const newPitch = {
            name: req.body.name,
            countries_id: req.body.countries_id,
            phone: req.body.phone,
            email: req.body.email,
            description: req.body.description,
            hours_price: req.body.hours_price,
            img : req.file?.filename || 'cancha-prueba.webp',
        };
        await db.Pitch.create(newPitch);
        return res.redirect('/')
        } catch (error) {
            return res.status(500).send(error);
        }
        },
        
    // DETAIL FROM ONE PITCH 

    // async detail (req, res) {
    //     try {
    //         const pitch = await db.Pitch.findByPk(req.params.id);
    //         res.render('pitchs/detail', { pitch });
    //     } catch (error) {
    //         res.status(500).send(error);
    //         }
    //     },

    // FORM TO EDIT 

    // async edit(req, res) {
    //     try {
    //         const pitch = await db.Pitch.findByPk(req.params.id);
    //         return res.render('pitchs/editPitchs', { Pitch: pitch });
    //     } catch (error) {
    //         return res.status(500).send(error);
    //     }
    // },

    // METHOD TO UPDATE 
    // async update(req, res) {
    //     try {
    //         await db.Pitch.update({ ...req.body }, { where: { id: req.params.id } });
    //         return res.redirect('/pitchs');
    //     } catch (error) {
    //         return res.status(500).send(error);
    //     }
    // },


    // DESTROY  

//     async destroy (req, res) {
//         try {
//             await db.Pitch.destroy({ where : { id : req.params.id}})
//         }      catch (error) {
//             return res.status(500).send(error);
//     }
//     res.redirect('/user');
// }

}

module.exports = controller;
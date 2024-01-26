
const db = require('../database/models')

const controller = {
    
    //ALL GAMES 

    async index(req, res) {
        try {
            const games = await db.PitchSchedul.findAll({
                include: [
                    'status',
                ]
            });
            res.render('games/games', { games });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // DETAIL FROM ONE GAME 

    // async detail (req, res) {
    //     try {
    //         const game = await db.PitchSchedul.findByPk(req.params.id);
    //         res.render('games/detail', { game });
    //     } catch (error) {
    //         res.status(500).send(error);
    //         }
    //     },

};

module.exports = controller;
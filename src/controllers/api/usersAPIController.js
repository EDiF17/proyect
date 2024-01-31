const db = require('../../database/models');
const { update } = require('../userController');
const Op = db.Sequelize.Op;


const usersAPIController = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll({
            attributes: { exclude: ["password", "roles_id", "createdAt", "updateAt"] },
        });

        const userList = users.map((user) => ({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            img: user.img,
            genre: user.genre,
            countries_id: user.countries_id,
            positions_id: user.positions_id,

        }));
        res.json({
            count: userList.length,
            data: userList,
            status: 200,
        });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },


    detail: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await db.User.findByPk(userId, {
            include: [
                { model: db.Country, as: "countries" },
                { model: db.Position, as: "positions" },
            ],
        });
    
            const userDetail = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                img: user.img,
                genre: user.genre,
                countries_id: user.countries.name,
                positions_id: user.positions.name,
        };

            res.json(userDetail);
        } catch (error) {
            res.status(500).json({
            status: 500,
            error: error.message,
        });
        }
    },


    // 'search': (req, res) => {
    //     db.User
    //         .findAll({
    //             where: {
    //                 name: { [Op.like]: '%' + req.query.keyword + '%' }
    //             }
    //         })
    //         .then(users => {
    //             return res.status(200).json(users);
    //         })
    // }
}

module.exports = usersAPIController;

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

            // detail: `/api/users/${user.id}`,

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
                attributes: { exclude: ["password", "roles_id"] },
        });
    
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ data: user, status: 200 });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
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

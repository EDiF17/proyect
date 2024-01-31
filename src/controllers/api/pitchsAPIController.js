const db = require('../../database/models');
const Op = db.Sequelize.Op;


const pitchsAPIController = {
    'list': async (req, res) => {
        const count = await db.Pitch.count();
        const countries = await db.Country.findAll();

        const countByCountry = {};
        for (const country of countries) {
            const countryName = country.name;
            const countryId = country.id;
            const countryCount = await db.Pitch.count({ where: { countries_id: countryId } });
            countByCountry[countryName] = countryCount;
        }

        const pitchs = await db.Pitch.findAll({
            attributes: ['id', 'name', 'description', 'phone', 'email', 'hours_price'],
            include: [{
                model: db.Country,
                as: 'countries',
                attributes: ['name']
            }]
        }
        )
        ;

        const pitchsArray = pitchs.map(pitch => {
            const detailUrl = `/api/pitchs/${pitch.id}`;
            const countryName = pitch.countries ? pitch.countries.name : 'N/A';
            return {
                id: pitch.id,
                name: pitch.name,
                description: pitch.description,
                phone: pitch.phone,
                email: pitch.email,
                hours_price: pitch.hours_price,
                country: countryName,
                detail: detailUrl
            };
        });

        const result = {
            count: count,
            countByCountryy: countByCountry,
            pitchs: pitchsArray
        };

        res.json(result);
},

    // 'detail': async (req, res) => {
    //     const pitch = await db.Pitch.findByPk(req.params.id, {
    //         include: [
    //             { association: 'countries' },
    //         ]
    //     });

    //     if (!pitch) {
    //         return res.status(404).json({ error: 'La cancha no existe' });
    //     }
        detail: async (req, res) => {
            try {
                const pitchId = req.params.id;
                const pitch = await db.Pitch.findByPk(pitchId, {
                include: [
                    { model: db.Country, as: "countries" },
                ],
            });
        
                const pitchDetail = {
                id: pitch.id,
                name: pitch.name,
                description: pitch.description,
                phone: pitch.phone,
                email: pitch.email,
                hours_price: pitch.hours_price,
                country: pitch.countries.name,
            };

                res.json(pitchDetail);
            } catch (error) {
                res.status(500).json({
                status: 500,
                error: error.message,
            });
            }
        },

    // 'search': (req, res) => {
    //     db.Pitch
    //         .findAll({
    //             where: {
    //                 name: {[Op.like]: '%' + req.query.keyword + '%'}
    //             }
    //         })
    //         .then(products => {
    //             return res.status(200).json(products);
    //         })
    }

module.exports = pitchsAPIController;





        //         // Formatear la fecha y hora
        //         const formattedDateTime = `${hours}:${minutes}:${seconds} hs - ${day}/${month}/${year}`;

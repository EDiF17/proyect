const controller = {
    pitchs (req, res) {
        return res.render('pitchs/pitchs');
    },

    detail (req, res) {
        return res.render('pitchs/detail');
    }

}

module.exports = controller;
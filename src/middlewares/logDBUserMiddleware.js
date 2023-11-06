const fs = require('fs');
const path = require('path');

function logDBUserMiddleware(req, res, next) {
    const filePath = path.join(__dirname, '../logs/logDBUsers.txt');
    fs.appendFileSync(filePath, `Se registró un nuevo usuario - ${Date.now()} - ${req.url}\n`);
    next();
}
module.exports = logDBUserMiddleware;
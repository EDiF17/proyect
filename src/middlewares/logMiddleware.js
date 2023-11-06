const fs = require('fs');
const path = require('path');

function logMiddleware(req, res, next) {
    const filePath = path.join(__dirname, '../logs/logs.txt');
    fs.appendFileSync(filePath, `${Date.now()} - ${req.url}\n`);
    next();
}
module.exports = logMiddleware;

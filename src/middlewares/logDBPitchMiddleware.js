const fs = require('fs');
const path = require('path');

function logDBPitchMiddleware(req, res, next) {
    const filePath = path.join(__dirname, '../logs/logsDBPitchs.txt');
    fs.appendFileSync(filePath, `Se registró una nueva sede - ${Date.now()} - ${req.url}\n`);
    next();
}
module.exports = logDBPitchMiddleware;
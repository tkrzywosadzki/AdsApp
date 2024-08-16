const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlinkSync(filePath);
}

module.exports = deleteFile;
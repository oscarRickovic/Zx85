const path = require("path");

class Statics {
    static STORAGE_DIR = path.join(__dirname, "..", "Storage")
}

module.exports = Statics;
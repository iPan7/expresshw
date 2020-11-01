const path = require("path");

module.exports = {
    htmlIndex: (req, res) => {
      res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    },
    htmlNotes: (req, res) => {
      res.sendFile(path.join(__dirname, "..", "public", "notes.html"));
    }
  }
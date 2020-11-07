const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
const fs = require("fs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routes
// =============================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public","index.html"));
});
//   * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public","notes.html"));
});
// API Routes
// =============================================================
app.route('/api/notes')
  //   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
  .get((req, res) => {
    const db = fs.readFileSync('db/db.json');
    res.send(JSON.parse(db));
})
  //  * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  .post((req, res) => {
    const newNote = req.body;
    const db = fs.readFileSync('db/db.json');
    const notes = JSON.parse(db);
    req.body.id = notes.length + 1;
    notes.push(newNote);
    const updatedNotes = fs.writeFileSync('db/db.json', JSON.stringify(notes));
    return res.send(updatedNotes);
  })
  //  * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete('/api/notes/:id', (req, res) => {
    const db = fs.readFileSync('db/db.json');
    let notes = JSON.parse(db);
    const id = req.params.id;
    for (let i = 0; i < notes.length; i++) {
      if (parseInt(id) === i + 1) {
        notes.splice(i, 1);
        let splicedNotes = notes;
        for (let i = 0; i < splicedNotes.length; i++) {
          splicedNotes[i].id = i + 1;
        }
        notes = splicedNotes;
        const updatedNotes = fs.writeFileSync('db/db.json', JSON.stringify(notes));
        return res.send(updatedNotes);
      }
    }
    return res.json(false);
  })
// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
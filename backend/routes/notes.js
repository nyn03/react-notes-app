var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middlewares/fetchuser')
const Notes = require('../models/Notes')

// Fetch all notes: GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Something went wrong!')
    }
});

// Create note: POST "/api/notes/create"
router.post('/create',
    fetchuser,
    [
        body('title', 'Enter title more than 3 characters').isLength({ min: 3 }),
        body('description', 'Enter description more than 5 characters').isLength({ min: 5 }),
        body('tag', 'Enter title tag than 3 characters').isLength({ min: 3 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;

            const note = new Notes({
                title, description, tag, user: req.user.id
            })

            const savedNote = await note.save();

            res.send(savedNote);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Something went wrong!')
        }
    })

// Update note: POST "/api/notes/update"
router.put('/update/:id',
    fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {};

            if(title) {
                newNote.title = title;
            }

            if(description) {
                newNote.description = description;
            }

            if(tag) {
                newNote.tag = tag;
            }

            const existingNote = await Notes.findById(req.params.id);
            if(!existingNote) {
                return res.status(404).send({error: "Not found"})
            }


            if(existingNote.user.toString() !== req.user.id) {
                return res.status(401).send({error: "Operation not allowed."})
            }

            const updatedNot = await Notes.findByIdAndUpdate(
                req.params.id, {$set: newNote}, {new:true}
            )

            return res.send(updatedNot);
        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Something went wrong!')
        }
})


// Update note: POST "/api/notes/delete"
router.delete('/delete/:id',
    fetchuser,
    async (req, res) => {
        try {
            
            const existingNote = await Notes.findById(req.params.id);
            if(!existingNote) {
                return res.status(404).send({error: "Not found"})
            }

            if(existingNote.user.toString() !== req.user.id) {
                return res.status(401).send({error: "Operation not allowed."})
            }

            await Notes.findByIdAndDelete(req.params.id);

            return res.send({message: "Note deleted successfully."});
        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Something went wrong!')
        }
})

module.exports = router;
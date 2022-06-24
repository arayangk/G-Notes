const express = require("express")
const auth = require('../middleware/Auth')
const router = express.Router();
const {
    singleNote,
    listAllNotes,
    createOneNotes,
    deleteNotes,
    editNotes
  }  = require('../controllers/Notes.controllers');

router.get('/listnotes',auth ,listAllNotes);

router.get('/singlenote/:id', singleNote);

router.post('/notes',auth , createOneNotes);

router.delete('/listnotes/:id', deleteNotes);

router.put('/listnotes/:id', editNotes);

module.exports = router ;
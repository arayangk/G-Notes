const Note = require('../models/Notes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();



exports.listAllNotes = (req, res) => {
 

    User.findById(req.user.id).populate('notes')
      .then((note) => {
        console.log(note);
        res.json(note);
      })
      .catch((err) => {
        res
          .status(404)
          .json({ message: "There isnt any note available", error: err.message });
      });
  };

exports.singleNote = (req, res) => {
 

    Note.findById(req.params.id)
      .then((note) => {
        console.log(note);
        res.json(note);
      })
      .catch((err) => {
        res
          .status(404)
          .json({ message: "There isnt any note available", error: err.message });
      });
  };



  
exports.createOneNotes = async (req, res) => {
    const body = req.body;
    
    const user = await User.findById(req.user.id)
    
    const note = new Note({
        title: body.name,
        note: body.email,
        date: new Date(),
        user: user._id
        
      })
      const savedNote = await note.save()
      user.notes = user.notes.concat(savedNote._id)
      await user.save()
      res.json(savedNote)
 

 
};

exports.deleteNotes = (req, res ) =>
{
  Note.findByIdAndRemove(req.params.id)
    .then((note) => {
    res.json({
        message: "Cheers!! You have successfully deleted your Note",
        note,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Sorry your Note is not there",
        error: err.message,
      });
    });
};

exports.editNotes = (req, res) => {
  console.log(req.body)
  Note.findByIdAndUpdate(req.params.id, req.body
  )
  
  .then((note) => {
    res.json({
        message: "Cheers!! You have successfully Edited your Note",
        note,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Sorry your Note is not there",
        error: err.message,
      });
    });
};
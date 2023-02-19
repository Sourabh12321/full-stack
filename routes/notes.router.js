const express = require("express");
const {notesModel} = require("../models/notes");
const jwt = require("jsonwebtoken");

const notesRouter = express.Router();


notesRouter.get("/", async (req, res) => {
    const notes = await notesModel.find();
    res.send(notes);
})

notesRouter.post("/create", async (req, res) => {
    const payload = req.body;
    const note = new notesModel(payload);
    await note.save();
    res.send({ "msg": "Note Created" });
})

notesRouter.delete("/delete/:id", async (req, res) => {
    const noteID = req.params.id;
    const note = await notesModel.findOne({ "_id": noteID })
    const userId_note = note.userId;
    const userId_req = req.body.userId
    try {
        if (userId_req !== userId_note) {
            res.send({ "msg": "You are not Authorized" });
        } else {
            await notesModel.findByIdAndDelete({ _id: noteID });
            res.send({ "msg": `Note with id ${noteID} has been Deleted` });
        }

    } catch (error) {

        res.send({ "msg": "unable to delete note", "error": error.message });
    }
})


notesRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const noteID = req.params.id;
    const note = await notesModel.findOne({ "_id": noteID })
    const userId_note = note.userId;
    const userId_req = req.body.userId
    try {
        if (userId_req !== userId_note) {
            res.send({ "msg": "You are not Authorized" });
        } else {
            await NoteModel.findByIdAndUpdate({ _id: noteID }, payload);
            res.send({ "msg": `Note with id ${noteID} has been updated` });
        }

    } catch (error) {

        res.send({ "msg": "unable to update note", "error": error.message });
    }

})


module.exports = { notesRouter }
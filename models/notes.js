const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    title:String,
    body:String,
    userId:String

},{
    versionKey:false
})

const notesModel = mongoose.model("note",notesSchema);

module.exports = {
    notesModel
}
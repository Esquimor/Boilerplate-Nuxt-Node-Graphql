import mongoose from "mongoose";
const Schema = mongoose.Schema;

const exerciceSchema = new Schema({
  name: String,
  type: Number,
  owner: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Exercice", exerciceSchema);

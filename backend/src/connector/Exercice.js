import Exercice from "../models/Exercice";

exports.getById = id => {
  return Exercice.findOne({
    _id: id,
    type: 0
  });
};

exports.getAll = () => {
  return Exercice.find({
    type: 0
  });
};

exports.addExercice = (args, user) => {
  let exercice = new Exercice({
    name: args.name,
    type: 0,
    owner: user.id
  });
  return exercice.save();
};

exports.removeExercice = async (args, user) => {
  const exercice = await Exercice.findOne({
    _id: args.id,
    owner: user.id
  }).update({
    type: 1
  });
  return exercice;
};

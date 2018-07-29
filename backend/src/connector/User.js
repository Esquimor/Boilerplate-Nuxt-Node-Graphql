import User from "../models/User";
import _ from "lodash";
import jwt from "jsonwebtoken";
import moment from "moment";

function generateToken(user) {
  var payload = {
    iss: "ownkoach.com",
    sub: user.id,
    iat: moment().unix(),
    exp: moment()
      .add(7, "days")
      .unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

exports.getById = id => {
  return User.findById(id);
};

exports.getAll = () => {
  return User.find();
};

exports.registerEmail = async args => {
  let userDouble = await User.findOne({ email: args.email });
  if (userDouble) {
    return null;
  }
  let user = new User({
    name: args.name,
    email: args.email,
    password: args.password
  });
  await user.save();
  let token = await generateToken(_.pick(user, ["id", "name", "email"]));
  return token;
};

exports.login = async args => {
  let user = await User.findOne({ email: args.email });
  if (!user) {
    return null;
  }
  let isMatch = await user.comparePassword(args.password);
  if (!isMatch) {
    return null;
  }
  let token = await generateToken(_.pick(user, ["id", "name", "email"]));
  return token;
};

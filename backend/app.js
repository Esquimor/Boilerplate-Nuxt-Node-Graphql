import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import resolvers from "./src/schema/resolvers";
import typeDefs from "./src/schema/typeDefs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";

import User from "./src/models/User";

const app = express();

dotenv.load();
app.use(cors());

mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true
  }
);

app.use(logger(process.env.MODE));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(require("./src/routes"));
app.use(function(req, res, next) {
  next(createError(404));
});

app.set("port", process.env.PORT);

const auth = auth => {
  let token = auth && auth.split(" ")[1];
  if (jwt.verify(token, process.env.TOKEN_SECRET)) {
    let payload = jwt.verify(token, process.env.TOKEN_SECRET);
    User.findById(payload.sub, function(err, user) {
      return user;
    });
  } else {
    throw new Error("Missing auth token!");
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  cacheControl: true,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      currentUser = auth(connectionParams.authorization);
    }
  },
  context: ({ req }) => ({
    user: () => {
      req.user = auth(req.headers.authorization);
    }
  })
});

server.listen().then(({ port }) => {
  console.log(`🚀  Server ready at ${port}`);
});

import UserConnector from "../../connector/User";

module.exports = {
  user: {
    resolve(parent, args) {
      return UserConnector.getById(args.id);
    }
  },
  users: {
    resolve(parent, args) {
      return UserConnector.getAll();
    }
  },
  me: {
    resolve(parent, args, { user }) {
      if (user) {
        return UserConnector.getById(user.id);
      }
      return null;
    }
  }
};

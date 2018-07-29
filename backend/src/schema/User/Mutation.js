import UserConnector from "../../connector/User";

module.exports = {
  registerEmail: {
    async resolve(parent, args) {
      const newUser = await UserConnector.registerEmail(args);
      return newUser;
    }
  },
  login: {
    async resolve(parent, args) {
      const token = await UserConnector.login(args);
      return token;
    }
  }
};

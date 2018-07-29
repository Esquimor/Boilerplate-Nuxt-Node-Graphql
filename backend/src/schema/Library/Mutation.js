import LibraryConnector from "../../connector/Library";
import Channel from "../channel";

module.exports = {
  addLibrary: {
    async resolve(parent, args, context) {
      if (!context.user) throw new Error(403);
      const library = await LibraryConnector.addLibrary(args, context.user);
      Channel.PubSub.publish(Channel.LIBRARY_ADDED, { addLibrary: library });
      return library;
    }
  },
  removeLibrary: {
    async resolve(parent, args, context) {
      if (!context.user === null) throw new Error(403);
      const library = await LibraryConnector.removeLibrary(args, context.user);
      Channel.PubSub.publish(Channel.LIBRARY_REMOVED, {
        removeLibrary: library,
        context
      });
      return library;
    }
  },
  updateLibrary: {
    async resolve(parent, args, context) {
      if (!context.user === null) throw new Error(403);
      const library = await LibraryConnector.updateLibrary(args, context.user);
      Channel.PubSub.publish(Channel.LIBRARY_UPDATE, {
        updateLibrary: library,
        context
      });
      return library;
    }
  }
};

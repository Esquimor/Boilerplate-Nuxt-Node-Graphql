import BookConnector from "../../connector/Book";
import Channel from "../channel";

module.exports = {
  addBook: {
    async resolve(parent, args, context) {
      if (!context.user) throw new Error(403);
      const book = await BookConnector.addBook(args, context.user);
      Channel.PubSub.publish(Channel.BOOK_ADDED, { addBook: book });
      return book;
    }
  },
  removeBook: {
    async resolve(parent, args, context) {
      if (!context.user === null) throw new Error(403);
      const book = await BookConnector.removeBook(args, context.user);
      Channel.PubSub.publish(Channel.BOOK_REMOVED, {
        removeBook: book,
        context
      });
      return book;
    }
  },
  updateBook: {
    async resolve(parent, args, context) {
      if (!context.user === null) throw new Error(403);
      const book = await BookConnector.updateBook(args, context.user);
      Channel.PubSub.publish(Channel.BOOK_UPDATE, {
        updateBook: book,
        context
      });
      return book;
    }
  }
};

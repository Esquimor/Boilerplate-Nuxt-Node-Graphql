<template>
  <div>
    Lists of Books:
    <div
      v-for="book in books"
      :key="book.key">
      {{ book.name }}
      <button @click="deletedBook(book.id)">Delete</button>
    </div>
    <div>
      Add Books:
      <form @submit.prevent="adddBook">
        <span>Name:</span>
        <input
          v-model="add"
          type="text"
          placeholder="Name">
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data: () => {
    return {
      books: [],
      add: ""
    };
  },
  apollo: {
    books: {
      query: gql`
        {
          books {
            name
            id
          }
        }
      `,
      subscribeToMore: {
        document: gql`
          subscription {
            adddBook {
              name
              id
            }
          }
        `,
        updateQuery: (previousResult, { subscriptionData }) => {
          const book = subscriptionData.data.adddBook;
          const newResult = {
            books: [...previousResult.books]
          };
          newResult.books.push(book);
          return newResult;
        }
      }
    }
  },
  methods: {
    adddBook() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($name: String) {
              adddBook(name: $name) {
                name
              }
            }
          `,
          variables: {
            name: this.add
          }
        })
        .then(() => {
          this.add = "";
        })
        .catch(error => {
          console.error(error);
        });
    },
    deletedBook(id) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($id: ID!) {
              removedBook(id: $id) {
                name
              }
            }
          `,
          variables: {
            id: id
          }
        })
        .then(data => {
          console.log(data.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

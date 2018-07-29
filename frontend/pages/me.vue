<template>
  <div>
    {{ me }}
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data: () => {
    return {
      me: {}
    };
  },
  apollo: {
    me: {
      query: gql`
        {
          me {
            name
            email
            id
          }
        }
      `
    }
  }
};
</script>

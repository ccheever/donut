let { ApolloServer, gql } = require('apollo-server');
let express = require('express');

// The GraphQL schema
let typeDefs = gql`
  type Query {
    hello: String
    code: String
  }

  type Mutation {
    setCode(code: String!): String
  }
`;

let code_ = null;

// A map of functions which return data for the schema.
let resolvers = {
  Query: {
    hello: async () => {
      return 'world';
    },
    code: async () => {
      return code_;
    },
  },
  Mutation: {
    setCode: async (_, { code }, context) => {
      code_ = code;
      return code_;
    },
  },
};

async function startAsync(opts) {
  opts = opts || {};

  let port = opts.port || 4010;

  let server = new ApolloServer({
    typeDefs,
    resolvers,
    // mocks: true,
    // onHealthCheck: () => fetch('https://fourtonfish.com/hellosalut/?mode=auto'),
  });

  let { url } = await server.listen({ port });
  console.log(`🚀 Server ready at ${url}`);
}

if (require.main === module) {
  startAsync({ port: process.env.PORT || 4010 });
}

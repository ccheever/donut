let { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema
let typeDefs = gql`
  type Query {
    hello: String
    mockedString: String
  }
`;

// A map of functions which return data for the schema.
let resolvers = {
  Query: {
    hello: () =>
      fetch('https://fourtonfish.com/hellosalut/?mode=auto')
        .then((res) => res.json())
        .then((data) => data.hello),
  },
};

if (require.main === module) {
  let server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: true,
    onHealthCheck: () => fetch('https://fourtonfish.com/hellosalut/?mode=auto'),
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

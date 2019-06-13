let { ApolloServer, gql } = require('apollo-server-express');
let express = require('express');

// The GraphQL schema
let typeDefs = gql`
  type Query {
    hello: String
    code: String
  }

  type Code {
    code: String
  }

  type Mutation {
    setCode(code: String!): Code
  }
`;

let code_ = `
function love.draw()
  love.graphics.print("Hello from Donut", 400, 300)
end`;

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
      return {
        code: code_,
      };
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

  let app = express();

  app.get('/game.lua', async (req, res) => {
    res.type('text/lua+castle');
    res.send(code_);
  });

  app.get('/', async (req, res) => {
    res.send(`
  <html>
  <pre>
  <a href="/game.lua">/game.lua</a>
  <a href="/graphql">/graphql</a>
  <a href="http://localhost:19006">Editor</a>
  </pre>
  </html>
    `);
  });

  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(`🚀 Server ready https://localhost:${port}/`);
  });
  return {
    app,
    server,
  };
}

if (require.main === module) {
  startAsync({ port: process.env.PORT || 4010 }).then(({ app, server }) => {
    // app, server
  });
}

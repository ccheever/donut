import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ApolloClient from 'apollo-boost';
import { ApolloProvider, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import MonacoEditor from 'react-monaco-editor';

let ac = new ApolloClient({ uri: 'http://localhost:4010/graphql' });

export default function App() {
  return (
    <ApolloProvider client={ac}>
      <View style={styles.container}>
        <Text> </Text>
        <MonacoEditor
          width={800}
          height={600}
          language="lua"
          theme="vs-dark"
          onChange={async (newValue, e) => {
            console.log('newValue=', newValue);
            await ac.mutate({
              mutation: gql`
                mutation($code: String!) {
                  setCode(code: $code) {
                    code
                  }
                }
              `,
              variables: {
                code: newValue,
              },
            });
          }}
          value={`
function love.draw()
  love.graphics.print("Hello from Donut", 400, 300)
end
`}
        />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MonacoEditor from "react-monaco-editor";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <MonacoEditor
        width={800}
        height={600}
        language="lua"
        theme="vs-dark"
        value={`
function love.draw()
    love.graphics.print("Hello from Snackastle", 400, 300)
end
      `}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

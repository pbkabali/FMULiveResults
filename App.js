import React from "react";
import axios from "axios";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const fetchResults = () => {
    alert("Fetching Results");
    axios
      .get(
        "https://sheet.best/api/sheets/3b6046e1-6d50-49b3-be97-e5c220528a34",
        // {},
        { headers: { "Content-Type": "application/json" } }
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Current Results" onPress={fetchResults} />
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

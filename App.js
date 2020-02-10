import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Image
} from "react-native";

import ResultsTable from "./components/resultsTable";
import { RESULTS_URL } from "./constants";

import dataBreakDown from "./helpers";
import results from "./data";

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [leftPane, setLeftPane] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [hieghtArray, setHieghtArray] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  const fetchResults = () => {
    setShowSpinner(true);
    axios
      .get(RESULTS_URL, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        let [left, height, data] = dataBreakDown(res.data);
        setLeftPane(left);
        setTableData(data);
        setHieghtArray(height);

        setShowResults(true);
        setShowSpinner(false);
      })
      .catch(error => {
        setShowSpinner(false);
        // console.log(error);
      });

    // let [left, height, data] = dataBreakDown(results);
    // setLeftPane(left);
    // setTableData(data);
    // setHieghtArray(height);

    // setShowResults(true);
    // setShowSpinner(false);
  };

  const backToMain = () => setShowResults(!showResults);

  return (
    <View style={styles.container}>
      {!showResults && !showSpinner && (
        <View>
          <Image
            style={styles.sponsorImage}
            source={{
              uri:
                "https://res.cloudinary.com/poloslive/image/upload/v1582117787/sample.jpg"
            }}
          />
          <Button title="Open Current Results" onPress={fetchResults} />
        </View>
      )}

      {showSpinner && !showResults && (
        <View>
          <ActivityIndicator size="large" />
          <Text>Fetching Current Results</Text>
        </View>
      )}

      {showResults && (
        <View>
          <ResultsTable
            leftPane={leftPane}
            hieghtArray={hieghtArray}
            tableData={tableData}
          />
          <View style={styles.footer}>
            <Button title="Back" onPress={backToMain} />
            <Button
              title="Refresh"
              onPress={() => {
                setShowResults(false);
                fetchResults();
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sponsorImage: {
    width: 200,
    height: 200
  }
});

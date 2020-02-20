import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import ResultsTable from "./components/resultsTable";
import { INITIAL_URL, HEADER_COLOR } from "./constants";
import SponsorImage from "./components/sponsorImage";
import dataBreakDown from "./helpers";
import results from "./data";

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [leftPane, setLeftPane] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [hieghtArray, setHieghtArray] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [urlArray, setUrlArray] = useState([]);

  const responseToState = res => {
    let [left, height, data, urls] = dataBreakDown(res.data);
    setLeftPane(left);
    setTableData(data);
    setHieghtArray(height);
    setUrlArray(urls);
  };

  useEffect(() => {
    setShowSpinner(true);
    axios
      .get(INITIAL_URL, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        responseToState(res);
        setShowSpinner(false);
      })
      .catch(error => {
        setShowSpinner(false);
      });

    // let [left, height, data, urls] = dataBreakDown(results);
    // setLeftPane(left);
    // setTableData(data);
    // setHieghtArray(height);
    // setUrlArray(urls);
    // setShowSpinner(false);
  }, []);

  const FetchResults = () => {
    setShowSpinner(true);
    axios
      .get(INITIAL_URL, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        responseToState(res);
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
          <TouchableOpacity
            onPress={FetchResults}
            style={{ alignItems: "center" }}
          >
            <SponsorImage source={urlArray[0]} length="350" high="200" />
            <Button title="Open Current Results" onPress={FetchResults} />
          </TouchableOpacity>
          <View style={styles.developerView}>
            <Text style={{ marginTop: 15 }}>
              Live Results brought to you by:{" "}
            </Text>
          </View>
          <View style={styles.sponsorLogos}>
            <SponsorImage source={urlArray[1]} />
            <SponsorImage source={urlArray[2]} />
            <SponsorImage source={urlArray[3]} />
            <SponsorImage source={urlArray[4]} />
            <SponsorImage source={urlArray[5]} />
            <SponsorImage source={urlArray[6]} />
            <SponsorImage source={urlArray[7]} />
            <SponsorImage source={urlArray[8]} />
            <SponsorImage source={urlArray[9]} />
            <SponsorImage source={urlArray[10]} />
            <SponsorImage source={urlArray[11]} />
            <SponsorImage source={urlArray[12]} />
          </View>
          <View style={styles.developerView}>
            <Text>Powered by: </Text>
            <Text style={{ color: HEADER_COLOR, fontWeight: "bold" }}>
              SPIKE NETWORKS LTD
            </Text>
          </View>
        </View>
      )}

      {showSpinner && !showResults && (
        <View>
          <ActivityIndicator size="large" />
          <Text>Loading . . .</Text>
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
                FetchResults();
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
  sponsorLogos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15
  },
  developerView: {
    alignItems: "center",
    justifyContent: "center"
  }
});

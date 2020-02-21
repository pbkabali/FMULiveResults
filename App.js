import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from "react-native";

import ResultsTable from "./components/resultsTable";
import {
  INITIAL_URL,
  HEADER_COLOR,
  TEXT_1_COLOR,
  SCREEN_WIDTH,
  BUTTON_1_COLOR
} from "./constants";
import SponsorImage from "./components/sponsorImage";
import dataBreakDown from "./helpers";
import results from "./data";

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [positionArray, setPositionArray] = useState(null);
  const [leftPane, setLeftPane] = useState(null);
  const [totalTimeArray, setTotalTimeArray] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [hieghtArray, setHieghtArray] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [urlArray, setUrlArray] = useState([]);

  const responseToState = res => {
    let [left, height, data, urls, position, totalTime] = dataBreakDown(
      res.data
    );
    setLeftPane(left);
    setTableData(data);
    setHieghtArray(height);
    setUrlArray(urls);
    setPositionArray(position);
    setTotalTimeArray(totalTime);
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
          <ScrollView>
            <TouchableOpacity
              onPress={FetchResults}
              style={{ alignItems: "center", paddingTop: 40 }}
            >
              <SponsorImage
                source={urlArray[0]}
                length={SCREEN_WIDTH * 0.8}
                high={SCREEN_WIDTH * 0.4}
              />
              <View style={styles.fetchButton}>
                <Text
                  style={{
                    color: TEXT_1_COLOR,
                    fontSize: 20,
                    fontWeight: "bold",
                    margin: 10
                  }}
                >
                  Open Current Results
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.developerView}>
              <Text
                style={{
                  color: TEXT_1_COLOR,
                  marginTop: 15,
                  fontWeight: "bold"
                }}
              >
                Live Results proudly brought to you by:{" "}
              </Text>
            </View>
            <View style={styles.sponsorLogos}>
              <SponsorImage source={urlArray[1]} />
              <SponsorImage source={urlArray[1]} />
              <SponsorImage source={urlArray[1]} />
              <SponsorImage source={urlArray[1]} />
              <SponsorImage source={urlArray[1]} />
              <SponsorImage source={urlArray[1]} />
              <SponsorImage source={urlArray[1]} />
              <SponsorImage source={urlArray[1]} />
              <SponsorImage source={urlArray[1]} />
            </View>
            <View style={styles.developerView}>
              <Text>Powered by: </Text>
              <Text style={{ fontWeight: "bold" }}>SPIKE NETWORKS LTD</Text>
            </View>
          </ScrollView>
        </View>
      )}

      {showSpinner && !showResults && (
        <View style={styles.developerView}>
          <View style={styles.sponsorLogos}>
            <SponsorImage source={urlArray[1]} />
            <SponsorImage source={urlArray[1]} />
            <SponsorImage source={urlArray[1]} />
          </View>
          <ActivityIndicator size="large" />
          <Text
            style={{
              color: TEXT_1_COLOR,
              fontSize: 20,
              fontWeight: "bold",
              margin: 10
            }}
          >
            Loading . . .
          </Text>
          <View style={styles.sponsorLogos}>
            <SponsorImage source={urlArray[1]} />
            <SponsorImage source={urlArray[1]} />
            <SponsorImage source={urlArray[1]} />
            <SponsorImage source={urlArray[1]} />
            <SponsorImage source={urlArray[1]} />
            <SponsorImage source={urlArray[1]} />
          </View>
          <View style={styles.developerView}>
            <Text>Powered by: </Text>
            <Text style={{ fontWeight: "bold" }}>SPIKE NETWORKS LTD</Text>
          </View>
        </View>
      )}

      {showResults && (
        <View>
          <ResultsTable
            leftPane={leftPane}
            hieghtArray={hieghtArray}
            tableData={tableData}
            positionArray={positionArray}
            totalTimeArray={totalTimeArray}
          />
          <View style={styles.footer}>
            <Button title="  Back    " onPress={backToMain} />
            <Button
              title="Refresh"
              color={BUTTON_1_COLOR}
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
    backgroundColor: HEADER_COLOR,
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
  },
  fetchButton: {
    backgroundColor: BUTTON_1_COLOR,
    borderRadius: 5,
    marginTop: 5
  }
});

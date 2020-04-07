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
  SCREEN_HEIGHT,
  BUTTON_1_COLOR,
  STATUS_BAR_HEIGHT
} from "./constants";
import SponsorImage from "./components/sponsorImage";
import HomeScreenSponsors from "./components/homeScreenSponsors";
import LoadingScreenSponsorsTop from "./components/loadingScreenSponsorsTop";
import LoadingScreenSponsorsBottom from "./components/loadingScreenSponsorsBottom";
import ResultsScreenSponsors from "./components/resultsScreenSponsors";
import { BannerAd } from "./components/googleAds";
import dataBreakDown from "./helpers";

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [positionArray, setPositionArray] = useState(null);
  const [leftPane, setLeftPane] = useState(null);
  const [totalTimeArray, setTotalTimeArray] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [hieghtArray, setHieghtArray] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [urlArray, setUrlArray] = useState([]);
  const [linkArray, setLinkArray] = useState([]);
  const [rallyName, setRallyName] = useState(null);

  const responseToState = res => {
    let [
      left,
      height,
      data,
      urls,
      links,
      position,
      totalTime,
      name
    ] = dataBreakDown(res.data);
    setLeftPane(left);
    setTableData(data);
    setHieghtArray(height);
    setUrlArray(urls);
    setLinkArray(links);
    setPositionArray(position);
    setTotalTimeArray(totalTime);
    setRallyName(name);
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
      });
  };

  const backToMain = () => setShowResults(!showResults);

  return (
    <View style={styles.container}>
      {!showResults && !showSpinner && (
        <View>
          <ScrollView>
            <TouchableOpacity
              onPress={FetchResults}
              style={{ alignItems: "center", paddingTop: STATUS_BAR_HEIGHT }}
            >
              <SponsorImage
                source={urlArray[0]}
                length={SCREEN_WIDTH * 0.8}
                high={SCREEN_HEIGHT * 0.2}
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
                  See Current Standings
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
            <HomeScreenSponsors urlArray={urlArray} linkArray={linkArray} />
          </ScrollView>
          <View style={styles.developerView}>
            <Text>Powered by: </Text>
            <Text style={{ fontWeight: "bold" }}>SPIKE NETWORKS LTD</Text>
          </View>
          <BannerAd />
        </View>
      )}

      {showSpinner && !showResults && (
        <View style={styles.developerView}>
          <LoadingScreenSponsorsTop urlArray={urlArray} />
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
          <LoadingScreenSponsorsBottom urlArray={urlArray} />
          <View style={styles.developerView}>
            <Text>Powered by: </Text>
            <Text style={{ fontWeight: "bold" }}>SPIKE NETWORKS LTD</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <BannerAd />
          </View>
        </View>
      )}

      {showResults && (
        <View>
          <View style={styles.footer}>
            <Button title="  Back    " onPress={backToMain} />
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#fff" }}>{rallyName}</Text>
              <Text>Un-Official Standings</Text>
            </View>
            <Button
              title="Refresh"
              color={BUTTON_1_COLOR}
              onPress={() => {
                setShowResults(false);
                FetchResults();
              }}
            />
          </View>
          <ResultsTable
            leftPane={leftPane}
            hieghtArray={hieghtArray}
            tableData={tableData}
            positionArray={positionArray}
            totalTimeArray={totalTimeArray}
          />
          <ResultsScreenSponsors urlArray={urlArray} linkArray={linkArray} />
          <BannerAd />
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
    justifyContent: "space-between",
    height: 40,
    marginTop: STATUS_BAR_HEIGHT
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

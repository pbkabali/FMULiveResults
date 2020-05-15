import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import ResultsTable from "./components/resultsTable";
import {
  INITIAL_URL,
  HEADER_COLOR,
  TEXT_1_COLOR,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  BUTTON_1_COLOR,
  STATUS_BAR_HEIGHT,
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
  const [showSpinner, setShowSpinner] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [positionArray, setPositionArray] = useState(null);
  const [leftPane, setLeftPane] = useState(null);
  const [totalTimeArray, setTotalTimeArray] = useState(null);
  const [penaltiesArray, setPenaltiesArray] = useState(null);
  const [diffLeaderArray, setDiffLeaderArray] = useState(null);
  const [diffPreviousArray, setDiffPreviousArray] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [hieghtArray, setHieghtArray] = useState(null);
  const [urlArray, setUrlArray] = useState([]);
  const [linkArray, setLinkArray] = useState([]);
  const [rallyName, setRallyName] = useState(null);

  const responseToState = (res) => {
    let [
      left,
      height,
      data,
      urls,
      links,
      position,
      totalTime,
      penalties,
      diffLeader,
      diffPrevoius,
      name,
    ] = dataBreakDown(res.data);
    setLeftPane(left);
    setTableData(data);
    setHieghtArray(height);
    setUrlArray(urls);
    setLinkArray(links);
    setPositionArray(position);
    setTotalTimeArray(totalTime);
    setPenaltiesArray(penalties);
    setDiffLeaderArray(diffLeader);
    setDiffPreviousArray(diffPrevoius);
    setRallyName(name);
  };

  useEffect(() => {
    axios
      .get(INITIAL_URL, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        responseToState(res);
        setShowSpinner(false);
      })
      .catch((error) => {
        setFetchError(error);
        setShowSpinner(false);
      });
  }, []);

  const FetchResults = () => {
    setFetchError(null);
    setShowSpinner(true);
    axios
      .get(INITIAL_URL, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        console.log(res.data);
        responseToState(res);
        console.log(urlArray);
        setShowResults(true);
        setShowSpinner(false);
      })
      .catch((error) => {
        setFetchError(error);
        setShowSpinner(false);
      });
  };

  const handleError = (error) => {
    console.log(error);
  };

  const backToMain = () => setShowResults(!showResults);

  return (
    <View style={styles.container}>
      {fetchError && (
        <View style={styles.errorDiv}>
          <Text style={styles.errorText}>{fetchError}</Text>
        </View>
      )}
      {!showResults && !showSpinner && (
        <View>
          <ScrollView>
            <TouchableOpacity
              onPress={FetchResults}
              style={{ alignItems: "center" }}
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
                    margin: 10,
                  }}
                >
                  Check Live Results
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.developerView}>
              <Text
                style={{
                  color: TEXT_1_COLOR,
                  marginTop: 15,
                  fontWeight: "bold",
                }}
              >
                Live Results proudly brought to you by:
              </Text>
            </View>
            <HomeScreenSponsors urlArray={urlArray} linkArray={linkArray} />
          </ScrollView>
          <View style={styles.developerView}>
            <Text>Powered by: </Text>
            <Text style={{ fontWeight: "bold" }}>SPIKE NETWORKS LTD</Text>
          </View>
          <BannerAd onError={handleError} />
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
              margin: 10,
            }}
          >
            Loading . . .
          </Text>
          <LoadingScreenSponsorsBottom urlArray={urlArray} />
          <View style={styles.developerView}>
            <Text>Powered by: </Text>
            <Text style={{ fontWeight: "bold" }}>SPIKE NETWORKS LTD</Text>
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
            penaltiesArray={penaltiesArray}
            diffLeaderArray={diffLeaderArray}
            diffPreviousArray={diffPreviousArray}
          />
          <ResultsScreenSponsors urlArray={urlArray} linkArray={linkArray} />
          <BannerAd onError={handleError} />
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
    justifyContent: "center",
    paddingTop: STATUS_BAR_HEIGHT,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
  },
  developerView: {
    alignItems: "center",
    justifyContent: "center",
  },
  fetchButton: {
    backgroundColor: BUTTON_1_COLOR,
    borderRadius: 5,
    marginTop: 5,
  },
  errorText: {
    fontStyle: "italic",
    color: "blue",
  },
  errorDiv: {
    backgroundColor: "#fff",
    width: SCREEN_WIDTH,
    marginTop: 30,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
});

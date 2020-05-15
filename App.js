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
  Modal,
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
  const [fetchError, setFetchError] = useState(false);
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
      .catch((err) => {
        setFetchError(true);
        setShowSpinner(false);
      });
  }, []);

  const FetchResults = () => {
    setFetchError(false);
    setShowSpinner(true);
    axios
      .get(INITIAL_URL, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        responseToState(res);
        setShowResults(true);
        setShowSpinner(false);
      })
      .catch((err) => {
        setFetchError(true);
        setShowSpinner(false);
      });
  };

  const handleError = (error) => {
    console.log(error);
  };

  const backToMain = () => setShowResults(!showResults);

  const retryFetch = () => {
    setFetchError(false);
    setShowSpinner(true);
    axios
      .get(INITIAL_URL, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        responseToState(res);
        setShowSpinner(false);
      })
      .catch((err) => {
        setFetchError(true);
        setShowSpinner(false);
      });
  };

  const dismissModal = () => setFetchError(false);

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={fetchError}>
        <View style={styles.modalView}>
          <View style={styles.errorDiv}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.errorHeader}>Error!</Text>
              <Text style={styles.errorText}>
                Try checking your internet connection
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <Text style={styles.modalDismiss} onPress={dismissModal}>
                DISMISS
              </Text>
              <Text
                style={[styles.modalDismiss, styles.modalTryAgain]}
                onPress={retryFetch}
              >
                TRY AGAIN
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {!showResults && !showSpinner && (
        <View>
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
  errorHeader: {
    fontStyle: "italic",
    color: HEADER_COLOR,
    fontSize: 20,
    fontWeight: "bold",
  },
  errorText: {
    fontStyle: "italic",
    color: "blue",
    fontWeight: "bold",
  },
  errorDiv: {
    backgroundColor: "rgba(235, 240, 241, 0.9)",
    width: SCREEN_WIDTH * 0.85,
    marginBottom: 20,
    height: SCREEN_HEIGHT * 0.2,
    justifyContent: "center",
    borderRadius: 10,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalDismiss: {
    color: HEADER_COLOR,
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 10,
  },
  modalTryAgain: {
    color: BUTTON_1_COLOR,
    marginRight: 10,
  },
});

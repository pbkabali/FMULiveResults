import React from "react";

import { StyleSheet, View } from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants";
import SponsorImage from "./sponsorImage";

export default function LoadingScreenSponsorsTop(props) {
  const { urlArray } = props;
  return (
    <View style={styles.sponsorLogos}>
      <SponsorImage
        source={urlArray[1]}
        length={SCREEN_WIDTH * 0.24}
        high={SCREEN_HEIGHT * 0.13}
      />
      <SponsorImage
        source={urlArray[2]}
        length={SCREEN_WIDTH * 0.24}
        high={SCREEN_HEIGHT * 0.13}
      />
      <SponsorImage
        source={urlArray[3]}
        length={SCREEN_WIDTH * 0.24}
        high={SCREEN_HEIGHT * 0.13}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sponsorLogos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10
  }
});

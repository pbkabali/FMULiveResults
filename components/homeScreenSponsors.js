import React from "react";

import { StyleSheet, View } from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants";
import SponsorImage from "./sponsorImage";

export default function HomeScreenSponsors(props) {
  const { urlArray, linkArray } = props;
  return (
    <View style={styles.sponsorLogos}>
      <SponsorImage
        source={urlArray[1]}
        href={linkArray[1]}
        length={SCREEN_WIDTH * 0.24}
        high={SCREEN_HEIGHT * 0.13}
      />
      <SponsorImage
        source={urlArray[2]}
        href={linkArray[2]}
        length={SCREEN_WIDTH * 0.24}
        high={SCREEN_HEIGHT * 0.13}
      />
      <SponsorImage
        source={urlArray[3]}
        href={linkArray[3]}
        length={SCREEN_WIDTH * 0.24}
        high={SCREEN_HEIGHT * 0.13}
      />
      <SponsorImage
        source={urlArray[4]}
        href={linkArray[4]}
        length={SCREEN_WIDTH * 0.24}
        high={SCREEN_HEIGHT * 0.13}
      />
      <SponsorImage
        source={urlArray[5]}
        href={linkArray[5]}
        length={SCREEN_WIDTH * 0.24}
        high={SCREEN_HEIGHT * 0.13}
      />
      <SponsorImage
        source={urlArray[6]}
        href={linkArray[6]}
        length={SCREEN_WIDTH * 0.24}
        high={SCREEN_HEIGHT * 0.13}
      />
      <SponsorImage
        source={urlArray[7]}
        href={linkArray[7]}
        length={SCREEN_WIDTH * 0.24}
        high={SCREEN_HEIGHT * 0.13}
      />
      <SponsorImage
        source={urlArray[8]}
        href={linkArray[8]}
        length={SCREEN_WIDTH * 0.24}
        high={SCREEN_HEIGHT * 0.13}
      />
      <SponsorImage
        source={urlArray[9]}
        href={linkArray[9]}
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

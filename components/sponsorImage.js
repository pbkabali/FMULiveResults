import React from "react";

import { StyleSheet, Image, View } from "react-native";

import { SCREEN_WIDTH, TEXT_1_COLOR } from "../constants";

export default function SponsorImage(props) {
  const { source, length, high } = props;
  return (
    <View
      style={[
        styles.imageView,
        length && { width: parseInt(length) * 1.04 },
        high && { height: parseInt(high) * 1.04 }
      ]}
    >
      <Image
        style={[
          styles.sponsorImage,
          length && { width: parseInt(length) },
          high && { height: parseInt(high) },
          { resizeMode: "contain" }
        ]}
        source={
          source
            ? {
                uri: source
              }
            : require("../assets/icon.png")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sponsorImage: {
    width: SCREEN_WIDTH * 0.23,
    height: SCREEN_WIDTH * 0.23,
    borderRadius: 25
  },
  imageView: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  }
});

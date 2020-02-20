import React from "react";

import { StyleSheet, Image } from "react-native";

export default function SponsorImage(props) {
  const { source, length, high } = props;
  return (
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
  );
}

const styles = StyleSheet.create({
  sponsorImage: {
    width: 100,
    height: 100
  }
});

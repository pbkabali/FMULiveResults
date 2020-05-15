import React from "react";

import { View } from "react-native";

import { AdMobBanner } from "expo-ads-admob";

import { GOOGLE_BANNER_ID } from "../constants";

export function BannerAd(props) {
  const { onError } = props;

  handleError = (error) => onError(error);
  return (
    <View style={{ alignItems: "center" }}>
      <AdMobBanner
        bannerSize="banner"
        adUnitID={GOOGLE_BANNER_ID}
        setTestDeviceID="EMULATOR"
        servePersonalizedAds={false} // true or false
        onDidFailToReceiveAdWithError={handleError}
      />
    </View>
  );
}

import React, { useEffect } from "react";
import { ActivityIndicator, View, Linking, Alert } from "react-native";
import { getStreamToken, getStreamUrl } from "../api/api";

export default function VideoPlayerScreen({ route, navigation }) {
  const { videoId } = route.params;

  useEffect(() => {
    async function openVideo() {
      try {
        const tokenRes = await getStreamToken(videoId);
        const streamRes = await getStreamUrl(videoId, tokenRes.data.token);

        await Linking.openURL(streamRes.data.stream_url);
        navigation.goBack(); 
      } catch (err) {
        Alert.alert("Error", "Could not open video");
        navigation.goBack();
      }
    }

    openVideo();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}


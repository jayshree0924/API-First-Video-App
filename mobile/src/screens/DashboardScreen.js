import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { getDashboard } from "../api/api";

export default function DashboardScreen({ navigation }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getDashboard().then(res => setVideos(res.data));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {videos.map(video => (
        <TouchableOpacity
          key={video._id}
          onPress={() => navigation.navigate("Player", { videoId: video._id })}
        >
          <Image source={{ uri: video.thumbnail_url }} style={{ height: 200 }} />
          <Text>{video.title}</Text>
          <Text>{video.description}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Text>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

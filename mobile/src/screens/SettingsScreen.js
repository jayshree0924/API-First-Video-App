import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { getProfile } from "../api/api";

export default function SettingsScreen({ navigation, setToken }) {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      getProfile()
        .then(res => setUser(res.data))
        .catch(err => console.log("Profile error", err));
    }, []);
  
    const logout = async () => {
      await SecureStore.deleteItemAsync("token");
      setToken(null);
    };
  
    if (!user) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>Name: {user.name}</Text>
        <Text style={{ fontSize: 18 }}>Email: {user.email}</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    );
  }
  
import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function SignupScreen({ navigation, setToken }) {
    const handleSignup = async () => {
      try {
        const res = await signup({ name, email, password });
        await SecureStore.setItemAsync("token", res.data.token);
        setToken(res.data.token);
      } catch {
        alert("Signup failed");
      }
    };
  

  return (
    <View style={{ padding: 20 }}>
      <TextInput style={{ padding: 10, backgroundColor: "white", borderRadius: 10, marginBottom: 20 }}  placeholder="Name" onChangeText={setName} />
      <TextInput style={{ padding: 10, backgroundColor: "white", borderRadius: 10, marginBottom: 20 }} placeholder="Email" onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={{ padding: 10, backgroundColor: "white", borderRadius: 10, marginBottom: 20 }} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}


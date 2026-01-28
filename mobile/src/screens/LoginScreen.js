import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen({ navigation, setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async () => {
      try {
        const res = await login({ email, password });
        await SecureStore.setItemAsync("token", res.data.token);
        setToken(res.data.token);
      } catch (err) {
        alert("Login failed");
      }
    };
  
      

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ padding: 10 }}>Email</Text>
            <TextInput style={{ padding: 10, backgroundColor: "white", borderRadius: 10 }} onChangeText={setEmail} autoCapitalize="none" />
            <Text style={{ padding: 10 }}>Password</Text>
            <TextInput style={{ padding: 10, backgroundColor: "white", borderRadius: 10, marginBottom: 20 }} secureTextEntry onChangeText={setPassword} />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Go to Signup" onPress={() => navigation.navigate("Signup")} />
        </View>
    );
}

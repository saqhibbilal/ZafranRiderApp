import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validUsername = "ZafranRider";
  const validPassword = "Zafran123";

  const handleLogin = () => {
    if (username === validUsername && password === validPassword) {
      setError("");
      navigation.navigate("Tabs"); // Navigate to the Tab navigator
    } else {
      setError("Invalid username or password");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Login;

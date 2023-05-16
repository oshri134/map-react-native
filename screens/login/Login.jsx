import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import firebase from "../../firebase";
import "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        // Successful login
        const user = userCredential.user;
        console.log("User logged in:", user.email);

        // Navigate to the map screen
        navigation.navigate("Map");
      })
      .catch((error) => {
        // Handle login error
        console.log("Login error:", error);
      });
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        name="password"
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="newPassword"
        secureTextEntry={false}
        value={password}
        enablesReturnKeyAutomatically
        onChangeText={(text) => setPassword(text)}
        a
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.signUpText}>Don't have an account?</Text>
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  signUpText: {
    marginTop: 16,
    marginBottom: 8,
  },
});

export default Login;

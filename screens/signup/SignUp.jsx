import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import firebase from "../../firebase";
import "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  
  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Successful sign-up
        const user = userCredential.user;
        console.log("User signed up:", user.email);
        // Additional logic to store first name and last name
        // You can use Firebase's Firestore or Realtime Database to store this information
        // Here, we are simply logging the values
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);

        navigation.navigate("Map");
      })
      .catch((error) => {
        // Handle sign-up error
        console.log("Sign-up error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
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
});

export default SignUp;

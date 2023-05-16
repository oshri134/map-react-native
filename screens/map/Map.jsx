import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Button,
  Text,
  Pressable,
  View,
} from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import firebase from "../../firebase"; // Update the path to your firebase configuration
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios"; // Import axios library
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Map = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({});

  const apiKey = "AIzaSyCc_rEceiO_QVcN6WD2b9XBIKeaNYgd4qI";
  const [pin, setPin] = useState({
    latitude: 32.10354512338237,
    longitude: 35.20785739334927,
  });
  const [region, setRegion] = useState({
    latitude: 32.10354512338237,
    longitude: 35.20785739334927,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Successful logout
        console.log("User logged out");
        navigation.navigate("Login"); // Navigate to the login screen
      })
      .catch((error) => {
        // Handle logout error
        console.log("Logout error:", error);
      });
  };

  return (
    <View style={{ marginTop: 50, flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          setData(data);

          setModalVisible(!modalVisible);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setPin({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: apiKey,
          language: "en",
          components: "country:isr",
          types: "restaurant",
          radius: 50000,
          location: `${region.latitude}, ${region.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          listView: { backgroundColor: "white" },
        }}
      />
      <MapView style={styles.map} region={region} provider="google">
        <Marker
          coordinate={pin}
          pinColor="black"
          draggable
          onDragEnd={(e) => {
            console.log("dragEnd", e.nativeEvent.coordinate);
          }}
        >
          {/* dsd */}
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={50000} />
      </MapView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{data.description}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  logoutButtonText: {
    color: "#2196F3",
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Map;

import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Appearance,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
  Text,
  Animated,
  ImageBackground,
  StatusBar,
  Linking,
  Vibration,
  Switch,
} from "react-native";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import EditEmergencyOption from "./edit-emergency-option";
import { FontAwesome } from "@expo/vector-icons";
import rctimage from "@/assets/images/a7395e40-2054-4147-8314-728e940a8063.jpg";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { BASE_API_URL } from "@/services/authService"; // Import BASE_API_URL



const defaultOptions = [
  { name: "Threat", contacts: [], procedure: "" },
  { name: "Accident", contacts: [], procedure: "" },
  { name: "Medical Emergency", contacts: [], procedure: "" },
  { name: "Fire", contacts: [], procedure: "" },
  { name: "Natural Disaster", contacts: [], procedure: "" },
];

export default function EmergencyOptions() {
  const navigation = useNavigation(); // Initialize navigation
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [options, setOptions] = useState(defaultOptions);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCallMode, setIsCallMode] = useState(false); // Toggle state for call or message

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // Hide the header
    StatusBar.setHidden(true); // Hide the status bar
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const fetchEmergencyOptions = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await fetch(`${BASE_API_URL}/contact/report-options`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch emergency options");
        }

        const data = await response.json();
        console.log("Fetched Emergency Options:", data);

        // If the backend returns an empty array, use the default options
        if (data.length === 0) {
          setOptions(defaultOptions);
        } else {
          setOptions(data);
        }
      } catch (error) {
        console.error("Error fetching emergency options:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to fetch emergency options.",
          position: "center",
        });
      }
    };

    fetchEmergencyOptions();
  }, []);

  const handleSendAlert = async (option) => {
    if (option.contacts.length === 0) {
      Toast.show({
        type: "error",
        text1: "No contacts set!",
        text2: `Add contacts for ${option.name} first.`,
        position: "center",
      });
      return;
    }

    Vibration.vibrate(500); // Vibrate to indicate the alert is being sent

    let location = null;
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Location Permission Denied",
          text2: "Cannot fetch location.",
          position: "center",
        });
        return;
      }

      location = await Location.getCurrentPositionAsync({});
    } catch (error) {
      console.error("Error fetching location:", error);
      Toast.show({
        type: "error",
        text1: "Failed to Get Location",
        text2: "Please enable GPS and try again.",
        position: "center",
      });
      return;
    }

    const { latitude, longitude } = location.coords;
    const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const timestamp = new Date().toLocaleString();
    const message = `⚠️⚠️ EMERGENCY ALERT ⚠️⚠️\n  ${option.name} \n ${option.procedure}\n 📌📌 Location: ${locationLink}\n🕒 ${timestamp}`;

    if (isCallMode) {
      // Call the phone number
      option.contacts.forEach((phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`).catch(() => {
          Toast.show({
            type: "error",
            text1: "Call Failed",
            text2: `Unable to call ${phoneNumber}.`,
            position: "center",
          });
        });
      });
    } else {
      // Send the message via WhatsApp
      option.contacts.forEach((phoneNumber) => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch((err) => {
          console.error(`Failed to send WhatsApp message to ${phoneNumber}:`, err);
          Toast.show({
            type: "error",
            text1: "Failed to Send Message",
            text2: `Could not send message to ${phoneNumber}.`,
            position: "center",
          });
        });
      });
    }

    // Save alert to history
    saveToHistory({ name: option.name, message, timestamp });
  };

  const saveToHistory = async (alert) => {
    try {
      const existingHistory = await AsyncStorage.getItem("alertHistory");
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.unshift(alert); // Add new entry at the beginning
      await AsyncStorage.setItem("alertHistory", JSON.stringify(history));
      console.log("Alert saved to history:", alert);
    } catch (error) {
      console.error("Error saving to history:", error);
    }
  };

  const handleEditOption = (item) => {
    setSelectedOption(item);
    setIsEditing(true);
  };

  const handleSaveOption = async (updatedOption) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(`${BASE_API_URL}/contact/report-options`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOption),
      });

      if (!response.ok) {
        throw new Error("Failed to update emergency option");
      }

      const data = await response.json();

      // Update the options state with the updated data
      setOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.name === updatedOption.name ? updatedOption : option
        )
      );

      setSelectedOption(null); // Close the edit modal
      setIsEditing(false); // Reset editing state
    } catch (error) {
      console.error("Error updating emergency option:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update emergency option.",
        position: "center",
      });
    }
  };

  return (
    <ImageBackground source={rctimage} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>REPORT</Text>
        <Text style={styles.titledes}>REPORT YOUR SITUATION</Text>

        {/* Toggle switch for calling or sending message */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Call  </Text>
          <Switch
            value={isCallMode}
            onValueChange={setIsCallMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isCallMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.emergencyButton}
                  activeOpacity={0.8}
                  onPress={() => handleSendAlert(item)}
                >
                  <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditOption(item)}
                >
                  <FontAwesome name="pencil" size={18} color="white" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
                No emergency options available.
              </Text>
            }
          />
        </Animated.View>

        {isEditing && selectedOption && (
          <EditEmergencyOption
            option={selectedOption}
            onSave={handleSaveOption} // Pass the handleSaveOption function
            onDismiss={() => setIsEditing(false)}
          />
        )}

        <Toast />
      </SafeAreaView>
    </ImageBackground>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    backgroundImage: {
      width: "100%",
      height: "100%",
      flex: 1,
      resizeMode: "cover",
    },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    title: {
      fontSize: 50,
      paddingTop: 50,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
      color: "white",
    },
    contentContainer: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 10,
    },
    titledes: {
      color: "rgb(75, 87, 170)",
      fontSize: 18,
      fontWeight: "calibery",
      textAlign: "center",
      textShadowColor: "rgba(0, 0, 0, 0.7)",
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 10,
      marginBottom: 10,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "centre",
      paddingTop:20,
      
    },
    switchLabel: {
      fontSize: 16,
      color: "white",
      fontWeight: "bold",
      paddingLeft:50,
      paddingBottom:30,
      paddingTop:30,
    },
    row: {
      flexDirection: "row",
<<<<<<< HEAD
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%", // Use percentage-based width for consistency
      maxWidth: 600,
=======
      justifyContent: "space-between", // Ensures even spacing between children
      alignItems: "center", // Vertically centers the content
      width: "90%", // Use percentage-based width for consistency
>>>>>>> ee96e9b901de969e0be4140b0b6c165394540444
      height: 55,
      marginBottom: 12,
      borderRadius: 18,
      backgroundColor: "rgba(0, 130, 245, 0.85)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
<<<<<<< HEAD
      elevation: 1,
      alignSelf: "center", // Center the row horizontally
      paddingHorizontal: 10, // Add padding for better spacing
=======
      elevation: 1, // Adds shadow for Android
      alignSelf: "center", // Centers the row horizontally
      paddingHorizontal: 10, // Adds padding inside the row
>>>>>>> ee96e9b901de969e0be4140b0b6c165394540444
    },
    emergencyButton: {
      flex: 1,
      paddingVertical: 14,
    },
    editButton: {
      padding: 10,
    },
    buttonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
}

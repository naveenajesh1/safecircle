import React, { useState, useEffect, useRef } from "react";
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
} from "react-native";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import EditEmergencyOption from "./edit-emergency-option";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import rctimage from "@/assets/images/a7395e40-2054-4147-8314-728e940a8063.jpg";

// Default emergency options
const defaultOptions = [
  { name: "Threat", contacts: ["naveen"], procedure: "Stay Safe!" },
  { name: "Accident", contacts: ["+9876543210"], procedure: "Call 911" },
  { name: "Medical Emergency", contacts: [], procedure: "Seek medical help" },
  { name: "Fire", contacts: [], procedure: "Evacuate immediately" },
  { name: "Natural Disaster", contacts: [], procedure: "Find shelter" },
];

export default function EmergencyOptions() {
  const navigation = useNavigation();
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Remove the white space at the top
  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // Hide header
    StatusBar.setHidden(true); // Hide status bar
  }, []);

  const [options, setOptions] = useState(defaultOptions);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSendAlert = (option) => {
    if (option.contacts.length === 0) {
      Toast.show({
        type: "error",
        text1: "No contacts set!",
        text2: `Add contacts for ${option.name} first.`,
        position: "center",
      });
      return;
    }

    console.log(`Sending alert to: ${option.contacts.join(", ")}`);

    Toast.show({
      type: "success",
      text1: "ALERT SENT!",
      text2: `Emergency alert sent to: ${option.contacts.join(", ")}`,
      position: "center",
    });
  };

  const handleEditOption = (item) => {
    setSelectedOption(item);
    setIsEditing(true);
  };

  const handleSaveOption = (updatedOption) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.name === updatedOption.name ? updatedOption : option
      )
    );
    setSelectedOption(null);
    setIsEditing(false);
  };

  return (
    <ImageBackground source={rctimage} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>REPORT </Text>
        <Text style={styles.titledes}>click on your situation </Text>

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
                  <FontAwesome name="pencil" size={18} color={theme.text} />
                </TouchableOpacity>
              </View>
            )}
          />
        </Animated.View>

        {isEditing && selectedOption && (
          <EditEmergencyOption
            option={selectedOption}
            onSave={handleSaveOption}
            onDismiss={() => setIsEditing(false)}
          />
        )}

        <Toast ref={(ref) => Toast.setRef(ref)} />
      </SafeAreaView>
    </ImageBackground>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    backgroundImage: {
      width: "100%",
      height: "100%", // Fix image size issue
      flex: 1,
      resizeMode: "cover",
    },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay for readability
    },
    title: {
      fontSize: 22,
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
      color: 'rgb(75, 87, 170)',
      fontSize: 18,
      fontWeight: 'calibery',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.7)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 10,
      marginBottom: 10,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      left:35,
      width:300,
      maxWidth: 600,
      height: 55,
      marginBottom: 12,
      borderRadius: 18,
      backgroundColor: "rgba(0, 130, 245, 0.85)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 1,
    },
    emergencyButton: {
      flex: 1,
      paddingVertical: 14,
    },
    editButton: {
      padding: 8,
    },
    buttonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
}

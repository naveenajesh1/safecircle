import { View, Text, StyleSheet, Switch, ImageBackground } from 'react-native';
<<<<<<< HEAD
import { useState, useLayoutEffect } from 'react';
=======
import { useState, useEffect } from 'react';
>>>>>>> ee96e9b901de969e0be4140b0b6c165394540444
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();

<<<<<<< HEAD
  useLayoutEffect(() => {
=======
  useEffect(() => {
>>>>>>> ee96e9b901de969e0be4140b0b6c165394540444
    navigation.setOptions({ headerShown: false }); // Hide the header
  }, [navigation]);

  const styles = createStyles(darkMode); // Dynamically generate styles based on darkMode
 
  return (
    <ImageBackground
      source={require('@/assets/images/innerbg.jpg')} // Path to your background image
      style={styles.backgroundImage}
    >
      {/* Overlay for dark mode */}
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Settings</Text>

          {/* Notification Toggle */}
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>

          {/* Dark Mode Toggle */}
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Settings;

const createStyles = (darkMode) =>
  StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // Ensures the image covers the entire screen
    },
    overlay: {
      flex: 1,
      backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.3)', // Adjust overlay based on darkMode
    },
    container: {
      flex: 1,
      justifyContent: 'center', // Center contents vertically
      alignItems: 'center', // Center contents horizontally
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'white', // Always white text color
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      padding: 15,
      backgroundColor: darkMode
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(51, 12, 120, 0.8)', // Change row background based on darkMode
      borderRadius: 10,
      elevation: 3,
      marginBottom: 15,
    },
    settingText: {
      fontSize: 18,
      color: 'white', // Always white text color
    },
  });
<<<<<<< HEAD
=======


>>>>>>> ee96e9b901de969e0be4140b0b6c165394540444

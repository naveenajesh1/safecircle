import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();
 
    useEffect(() => {
      navigation.setOptions({ headerShown: false }); // Hide header
    }, []);


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem("alertHistory");
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory)); // Parse and set the history
        }
      } catch (error) {
        console.error("Error retrieving history:", error);
      }
    };

    fetchHistory();
  }, []); // Empty dependency array means this runs once when the component is mounted

  const handleDelete = async (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1); // Remove the item at the given index

    try {
      await AsyncStorage.setItem("alertHistory", JSON.stringify(newHistory)); // Save updated history
      setHistory(newHistory); // Update local state to reflect changes
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>{item.message}</Text>
      <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
        <FontAwesome name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HISTORY</Text>
      {history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noHistory}>No history available.</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 54,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    left:27,
    width:325,
    maxWidth: 600,
    height: 150,
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: "rgba(123, 150, 165, 0.85)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  historyText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft:15,
  },
  deleteButton: {
    marginRight: 30,
    marginTop:75, 
    // Adds some space between the text and the delete button
  },
  noHistory: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#888",
  },
});

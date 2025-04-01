import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function EditEmergencyOption({ option, onSave, onDismiss }) {
  // Remove +91 prefix for display
  const [contacts, setContacts] = useState(
    option.contacts.map((c) => c.replace("+91", "")).join(", ")
  );
  const [procedure, setProcedure] = useState(option.procedure);

  const handleSave = () => {
    const updatedOption = {
      ...option,
      contacts: contacts
        .split(",")
        .map((c) => c.trim()) // Trim whitespace
        .filter((c) => /^[0-9]{10}$/.test(c)) // Validate 10-digit numbers
        .map((c) => `+91${c}`), // Prepend +91 to each number
      procedure,
    };

    if (updatedOption.contacts.length === 0) {
      Toast.show({
        type: "error",
        text1: "Invalid Contacts",
        text2: "Please enter valid 10-digit phone numbers.",
        position: "center",
      });
      return;
    }

    onSave(updatedOption); // Pass the updated option back to the parent
  };

  return (
    <Modal transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit {option.name}</Text>

          <Text style={styles.label}>Emergency Contacts (comma-separated):</Text>
          <TextInput
            style={styles.input}
            value={contacts}
            onChangeText={setContacts}
            placeholder="Enter contacts"
          />

          <Text style={styles.label}>Procedure:</Text>
          <TextInput
            style={styles.input}
            value={procedure}
            onChangeText={setProcedure}
            placeholder="Enter emergency procedure"
            multiline
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <FontAwesome name="check" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onDismiss}>
              <FontAwesome name="times" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "85%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
});
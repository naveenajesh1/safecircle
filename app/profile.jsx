import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [editableDetails, setEditableDetails] = useState({
    bloodGroup: "",
    medicalConditions: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken"); 
      console.log("Retrieved Token:", token); // ✅ Debugging token retrieval
  
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
  
      const response = await fetch("http://192.168.20.4:5000/api/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("HTTP Status Code:", response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Profile Fetch Error:", errorText);
        alert(`Failed to fetch profile: ${errorText}`);
        throw new Error(`Failed to fetch profile: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Profile Response:", data); // ✅ Debugging API response
  
      setUserDetails(data);
      setEditableDetails({
        aadhar: data.aadhar || "",
        address: data.address || "",
        dob: data.dob || "",
        bloodGroup: data.bloodGroup || "",
        medicalConditions: data.medicalConditions || "",
      });
      setProfileImage(data.profileImage || null);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert(`Failed to load profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        alert("User not authenticated. Please log in again.");
        return;
      }

      const response = await fetch("http://192.168.20.4:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableDetails),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      setUserDetails((prev) => ({ ...prev, ...editableDetails }));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setEditableDetails({ ...editableDetails, profileImage: result.assets[0].uri });
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('@/assets/images/featured_ask_help_istock-1.webp')}
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <DetailRow label="Name" value={userDetails?.name} isEditable={false} />
        <DetailRow label="Phone" value={userDetails?.phone} isEditable={false} />
        <DetailRow label="Email" value={userDetails?.email} isEditable={false} />
        <DetailRow label="Address" value={userDetails?.address} isEditable={false} />
        <DetailRow label="Aadhar-No" value={userDetails?.aadhar} isEditable={false} />
        <DetailRow label="Date od Birth" value={userDetails?.dobl} isEditable={false} />
        <DetailRow label="Blood Group" value={editableDetails.bloodGroup} onChangeText={(text) => setEditableDetails({ ...editableDetails, bloodGroup: text })} />
        <DetailRow label="Medical Conditions" value={editableDetails.medicalConditions} onChangeText={(text) => setEditableDetails({ ...editableDetails, medicalConditions: text })} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const DetailRow = ({ label, value, isEditable = true, onChangeText }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}:</Text>
    {isEditable ? (
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
    ) : (
      <Text style={styles.value}>{value}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: Colors.light.background },
  imageContainer: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  changePhotoText: { marginTop: 5, color: "blue" },
  infoContainer: { backgroundColor: "white", padding: 15, borderRadius: 10, elevation: 3 },
  detailRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  label: { fontSize: 16, fontWeight: "bold" },
  value: { fontSize: 16, color: "gray" },
  input: { flex: 1, fontSize: 16, borderBottomWidth: 1, borderBottomColor: "gray", padding: 5 },
  saveButton: { marginTop: 20, backgroundColor: "blue", padding: 12, borderRadius: 5, alignItems: "center" },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

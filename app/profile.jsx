import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants/Colors";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    phone: "+91 9876543210",
    email: "johndoe@example.com",
    aadhar: "1234-5678-9012",
    address: "123, Street Name, City, Country",
    dob: "1995-01-01",
  });
  const [editableDetails, setEditableDetails] = useState({
    aadhar: userDetails.aadhar,
    address: userDetails.address,
    dob: userDetails.dob,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setUserDetails((prev) => ({ ...prev, ...editableDetails }));
    alert("Profile updated successfully!");
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('@/assets/images/featured_ask_help_istock-1.webp')}
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>
      
      {/* User Details */}
      <View style={styles.infoContainer}>
        <DetailRow label="Name" value={userDetails.name} isEditable={false} />
        <DetailRow label="Phone" value={userDetails.phone} isEditable={false} />
        <DetailRow label="Email" value={userDetails.email} isEditable={false} />
        <DetailRow label="Aadhar No" value={editableDetails.aadhar} onChangeText={(text) => setEditableDetails({...editableDetails, aadhar: text})} />
        <DetailRow label="Address" value={editableDetails.address} onChangeText={(text) => setEditableDetails({...editableDetails, address: text})} />
        <DetailRow label="Date of Birth" value={editableDetails.dob} onChangeText={(text) => setEditableDetails({...editableDetails, dob: text})} />
      </View>
      
      {/* Save Button */}
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
});

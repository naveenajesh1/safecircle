import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useState } from 'react';
import { login, register } from '@/services/authService'; // Import API functions
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle Login & Signup
  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await login(email, password);
        Alert.alert('Success', 'Logged in successfully!');
      } else {
        await register({ name, address, aadhar, phone, email, dob, gender, password });
        Alert.alert('Success', 'Account created successfully!');
      }
      navigation.navigate('profile'); // Redirect after success
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <IconSymbol size={100} color="#4A90E2" name="chevron.left.forwardslash.chevron.right" style={styles.headerImage} />
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">{isLogin ? 'Login' : 'Create Account'}</ThemedText>
          </ThemedView>

          <View style={styles.inputContainer}>
            {!isLogin && (
              <>
                <InputField label="Name" value={name} onChangeText={setName} />
                <InputField label="Address" value={address} onChangeText={setAddress} />
                <InputField label="Aadhar Number" value={aadhar} onChangeText={setAadhar} />
                <InputField label="Date of Birth" value={dob} onChangeText={setDob} />
                <InputField label="Gender" value={gender} onChangeText={setGender} />
              </>
            )}

            <InputField label="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <InputField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <InputField label="Password" value={password} onChangeText={setPassword} secureTextEntry />

          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchText}>{isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable Input Field Component
const InputField = ({ label, value, onChangeText, keyboardType = 'default', secureTextEntry = false }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 20,
    backgroundColor: 'transparent' ,
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#4A90E2',
    marginTop: 10,
  },
});


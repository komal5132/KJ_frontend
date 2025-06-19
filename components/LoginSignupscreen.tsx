import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { TapGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture";

const { height } = Dimensions.get("window");

const LoginSignupscreen = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showmodal, setshowmodal] = useState(false);
  const [adminData, setadminData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const router = useRouter();

  useEffect(() => {
    const checkRegistered = async () => {
      const value = await AsyncStorage.getItem("user_registered");
      if (value === "true") {
        router.replace("/(Tab)");
      } else {
        setShowForm(true);
      }
    };
    checkRegistered();
  }, []);

  const handleAdminContinue = async () => {
    console.log("inside admin continue");

    if (!adminData.email.trim() || !adminData.password.trim()) {
      Alert.alert("Please fill in all fields correctly before continuing.");
      return;
    }

    const formdata = {
      role: "superadmin",
      email: adminData.email.trim(),
      password: adminData.password.trim(),
    };

    console.log("formdata data after click on continue = ", formdata);

    try {
      const response = await axios.post(
        `http://192.168.31.4:8000/api/admin/loginAdmin`,
        formdata
      );

      const resData = response.data;

      if (!resData.success) {
        Alert.alert("Login Failed", resData.message || "Invalid credentials");
        return;
      }

      setadminData({email:"",password:""})

      // ✅ Only push route if login is successful
      router.push("/(Admin)/AdminHome");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Server Error", "Could not login. Try again later.");
    }
  };

  const handleContinue = async () => {
    if (!name.trim() || !gender.trim() || mobile.trim().length !== 10) {
      Alert.alert("Please fill in all fields correctly before continuing.");
      return;
    }

    const payload = {
      name: name.trim(),
      gender: gender.trim(),
      mobileNum: mobile.trim(),
    };

    try {
      const response = await axios.post(
        "http://192.168.31.4:8000/api/user/registerUser",
        payload
      );
      const result = response.data;

      await AsyncStorage.setItem("user_registered", "true");
      await AsyncStorage.setItem("username", result.user.name);
      await AsyncStorage.setItem("userId", response.data.user._id);
      if (result.token) {
        await AsyncStorage.setItem("token", result.token); // Optional
      }

      router.replace("/(Tab)");
    } catch (error: any) {
      console.error("API error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to connect to server."
      );
    }
  };

  if (!showForm) return null;

  const handleTap = () => {
    setshowmodal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={require("../assets/images/loginBG.png")}
          style={styles.topSection}
          resizeMode="cover"
        >
          <TapGestureHandler numberOfTaps={2} onActivated={handleTap}>
            <Image
              style={{ width: 60, height: 60, top: -135, right: 140 }}
              source={require("../assets/images/kartikjlogo.png")}
            />
          </TapGestureHandler>

          <Text style={styles.welcomeText}>
            Welcome to your jewellery world
          </Text>
        </ImageBackground>

        <View style={styles.bottomSection}>
          <Text style={styles.formTitle}>Let's Get to Know You</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#ccc"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={gender}
                onValueChange={setGender}
                style={styles.picker}
                dropdownIconColor="#4b2e2e"
              >
                <Picker.Item label="Select Gender" value="" enabled={false} />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your number"
              placeholderTextColor="#ccc"
              keyboardType="number-pad"
              value={mobile}
              onChangeText={(text) => {
                const onlyNums = text.replace(/[^0-9]/g, "");
                if (onlyNums.length <= 10) {
                  setMobile(onlyNums);
                }
              }}
              maxLength={10}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>✨ Continue</Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>

      <Modal visible={showmodal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Your Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                placeholderTextColor="#aaa"
                value={adminData.email}
                onChangeText={(text) =>
                  setadminData({ ...adminData, email: text })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#aaa"
                value={adminData.password}
                onChangeText={(text) =>
                  setadminData({ ...adminData, password: text })
                }
              />
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleAdminContinue}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setshowmodal(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default LoginSignupscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3d4b6",
  },
  topSection: {
    height: height * 0.45,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 30,
    top: -50,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#fff8f2",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    paddingHorizontal: 30,
    paddingVertical: 40,
    marginTop: -60,
    elevation: 10,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4b2e2e",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4b2e2e",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f1eb",
    paddingHorizontal: 15,
    color: "#4b2e2e",
    fontSize: 15,
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4b2e2e",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff8f2",
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerWrapper: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f1eb",
    justifyContent: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    color: "#4b2e2e",
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 15,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  continueButton: {
    backgroundColor: "#CE8B39",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: "#9E0524",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

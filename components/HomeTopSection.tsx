import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeTopSection = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [showModal, setShowmodal] = useState(false);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const storedName = await AsyncStorage.getItem("username");
        console.log("Fetched name:", storedName);
        if (storedName) {
          setName(storedName);
        }
      } catch (error) {
        console.log("Failed to load username:", error);
      }
    };

    getUsername();
  }, []);

  const handleModal = () => {
    setShowmodal(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user_registered");
    await AsyncStorage.removeItem("username");
    setShowmodal(false);
    router.replace("/LoginSignUp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topMostSection}>
        <View style={styles.welcomePart}>
          <Text style={styles.greeting}>Welcome,</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <TouchableOpacity onPress={()=>setShowmodal(true)}>
          <Image
            source={require("../assets/images/kartikjlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push("/Search")}
        style={styles.searchbarContainer}
      >
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <Text style={styles.searchInput}>Search</Text>
        <TouchableOpacity>
          <Ionicons
            name="options-outline"
            size={20}
            color="#265341"
            style={styles.filterIcon}
            onPress={() => router.push("/Search")}
          />
        </TouchableOpacity>
      </TouchableOpacity>
       <Modal visible={showModal} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Do you want to logout...?</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowmodal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </View>
  );
};

export default HomeTopSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 25,
    backgroundColor: "#fff",
  },
  topMostSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  welcomePart: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4b2e2e",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d17f3f",
    marginTop: 4,
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  searchbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 25,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  logoutButton: {
    backgroundColor: "#d62828",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

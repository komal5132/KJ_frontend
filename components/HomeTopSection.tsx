import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeTopSection = () => {
  const router = useRouter();
  const [name, setName] = useState("");

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

  return (
    <View style={styles.container}>
      <View style={styles.topMostSection}>
        <View style={styles.welcomePart}>
          <Text style={styles.greeting}>Welcome,</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Image
          source={require("../assets/images/kartikjlogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
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
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem("user_registered");
          await AsyncStorage.removeItem("username");
          router.replace("/LoginSignUp");
        }}
        style={{ padding: 10, backgroundColor: "tomato", marginTop: 20 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Reset & Register Again
        </Text>
      </TouchableOpacity>
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
});

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";

const { height, width } = Dimensions.get("window");

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={() => router.push("/(Tab)")}>
      <View style={styles.container}>
        {/* Top section with background */}
        <View style={styles.topSection}>
          <Image
            source={require("../assets/images/bgofwelcome.jpg")} // Jewelry background
            style={styles.backgroundImage}
          />
          <View style={styles.overlayContent}>
            <Image
              source={require("../assets/images/kartikjlogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandText}>Kartik Jewellers</Text>
          </View>
        </View>

        {/* Bottom blank section (for spacing and base) */}
        <View style={styles.bottomSection}></View>

        {/* Overlapping ring image */}
        <Image
          source={require("../assets/images/ring.png")}
          style={styles.ringImage}
          resizeMode="contain"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",  
  },
  topSection: {
    height: height * 0.8,
    width: "100%",
    position: "relative",
    
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  overlayContent: {
    position: "absolute",
    top: "25%",
    width: "100%",
    alignItems: "center",    
  },
  logo: {
    width: 120,
    height: 120,
  },
  brandText: {
    marginTop: 50,
    fontSize: 32,
    fontWeight: "bold",
    color: "#4b2e2e",
    fontFamily: "serif",
  },
  bottomSection: {
    flex: 1,
  },
  ringImage: {
    position: "absolute",
    top: height * 0.6,
    alignSelf: "center",
    width: width * 0.7,
    height: height * 0.35,
    zIndex: 10,
  },
});

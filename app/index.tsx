import WelcomeScreen from "@/components/WelcomeScreen";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{backgroundColor:"#ffffff"}}>
      <WelcomeScreen/>
    </View>
  );
}

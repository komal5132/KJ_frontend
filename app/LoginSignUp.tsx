import LoginSignupscreen from "@/components/LoginSignupscreen";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const LoginSignUp = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1,marginTop:30 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20} // Adjust if header exists
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LoginSignupscreen />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginSignUp;

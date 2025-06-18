import AddCategorycomponent from "@/components/AddCategorycomponent";
import AddProductComponent from "@/components/AddProductComponent";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const AddJewelleryProduct = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <AddProductComponent/>
        <AddCategorycomponent/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddJewelleryProduct;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5E7D6",
    flexGrow: 1,
    marginTop: 30,
  },
});

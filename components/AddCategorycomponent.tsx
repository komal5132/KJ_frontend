import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useFonts } from "expo-font";

const BACKEND_URL = "http://192.168.31.4:8000";

const AddCategorycomponent = () => { 
  const [fontsLoaded] = useFonts({
    PlayfairBold: require("../assets/fonts/static/PlayfairDisplay-Bold.ttf"),
  });

  //fonts
  if (!fontsLoaded) return null;
  const [newCategory, setNewcategory] = useState({
    name: "",
    image: null as string | null,
  });

  //image handler
  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setNewcategory({ ...newCategory, image: uri });
    }
  };

  //handle category
  const handleCategorySubmit = async () => {
    if (!newCategory.name.trim() || !newCategory.image) {
      Alert.alert("Validation", "Please provide both name and image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory.name.trim());

    formData.append("image", {
      uri: newCategory.image,
      name: "category.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/product/addcategory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        Alert.alert("Success", "Category added successfully!");
        setNewcategory({ name: "", image: null });
      } else {
        Alert.alert("Error", response.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Add Category Error:", error);
      Alert.alert("Error", "Failed to add category. Try again.");
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
    >
      <Text style={[styles.heading, { marginTop: 20 }]}>Add New Category</Text>
      <View style={styles.form}>
        <TextInput
          label="Product Name"
          mode="outlined"
          value={newCategory.name}
          onChangeText={(text) =>
            setNewcategory({ ...newCategory, name: text })
          }
          style={styles.input}
          // outlineColor="#CE8B39"
          activeOutlineColor="#593C2D"
        />
        {newCategory.image ? (
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={{ uri: newCategory.image }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handleImagePick}
          >
            <Text style={styles.imagePickerText}>Upload Image</Text>
          </TouchableOpacity>
        )}
        <Button
          mode="contained"
          onPress={handleCategorySubmit}
          style={styles.button}
          buttonColor="#CE8B39"
        >
          Add Category
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddCategorycomponent;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5E7D6",
    flexGrow: 1,
    marginTop: 30,
  },
  heading: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "PlayfairBold",
    color: "#593C2D",
  },
  form: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#593C2D",
    marginBottom: 5,
  },
  imagePicker: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
  },
  imagePickerText: {
    color: "#593C2D",
    fontSize: 16,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#593C2D",
    borderRadius: 4,
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },

  picker: {
    fontSize: 16,
    color: "#000",
    width: "100%",
  },

  pickerLabel: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    fontSize: 12,
    color: "#593C2D",
    zIndex: 1,
  },
});

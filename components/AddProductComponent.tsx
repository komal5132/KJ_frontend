import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Button, TextInput } from "react-native-paper";
import { useFonts } from "expo-font";
import axios from "axios";

type CategoryType = {
  _id: string | number;
  name: string;
  image: string | number;
};

const BACKEND_URL = "http://192.168.31.4:8000";

const AddProductComponent = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.post(
          "http://192.168.31.4:8000/api/product/getcategory"
        );
        setCategories(res.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const [fontsLoaded] = useFonts({
    PlayfairBold: require("../assets/fonts/static/PlayfairDisplay-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const [product, setProduct] = useState({
    name: "",
    category: "",
    code: "",
    productType: "",
    image: null as string | null,
  });

  const handleImagePick = async () => {
    // Ask for media library permission
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
      setProduct({ ...product, image: uri });
    }
  };

  const handleSubmit = async () => {
    if (
      !product.name.trim() ||
      !product.image ||
      !product.category.trim() ||
      !product.code.trim() ||
      !product.productType.trim()
    ) {
      Alert.alert("Validation", "Please provide all valid data.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name.trim());
    formData.append("category", product.category.trim());
    formData.append("code", product.code.trim());
    formData.append("productType", product.productType.toLowerCase().trim());
    formData.append("image", {
      uri: product.image,
      name: "category.jpg",
      type: "image/jpeg",
    } as any);

    console.log("form data of add product==",formData)

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/product/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        Alert.alert("Success", "Product added successfully!");
        setProduct({
          name: "",
          image: null,
          code: "",
          category: "",
          productType: "",
        });
      } else {
        Alert.alert("Error", response.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Add product Error:", error);
      Alert.alert("Error", "Failed to add product. Try again.");
    }
  };    

  return (
    <View>
      <Text style={styles.heading}>Add Product</Text>
      <View style={styles.form}>
        {product.image ? (
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={{ uri: product.image }}
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

        <TextInput
          label="Product Name"
          mode="outlined"
          value={product.name}
          onChangeText={(text) => setProduct({ ...product, name: text })}
          style={styles.input}
          // outlineColor="#CE8B39"
          activeOutlineColor="#593C2D"
        />

        <View style={styles.input}>
          <Text style={styles.pickerLabel}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={product.category}
              onValueChange={(itemValue) =>
                setProduct({ ...product, category: itemValue })
              }
              style={styles.picker}
              dropdownIconColor="#593C2D"
            >
              <Picker.Item label="Select a category" value="" />
              {categories.map((category) => (
                <Picker.Item
                  key={category._id.toString()}
                  label={category.name}
                  value={category.name}
                />
              ))}
            </Picker>
          </View>
        </View>

        <TextInput
          label="Product Code"
          mode="outlined"
          value={product.code}
          onChangeText={(text) => setProduct({ ...product, code: text })}
          style={styles.input}
          // outlineColor="#CE8B39"
          activeOutlineColor="#593C2D"
        />

        <TextInput
          label="Product Type"
          mode="outlined"
          value={product.productType}
          onChangeText={(text) => setProduct({ ...product, productType: text })}
          style={styles.input}
          // outlineColor="#CE8B39"
          activeOutlineColor="#593C2D"
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          buttonColor="#CE8B39"
        >
          Add Product
        </Button>
      </View>
    </View>
  );
};

export default AddProductComponent;

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

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const BACKEND_URL = "http://192.168.31.4:8000";

type Product = {
  _id: string;
  name: string;
  code: string;
  category: string;
  productType: string;
  image: string;
};

const ProductsListandeditcomponent = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    code: string;
    category: string;
    productType: string;
    image: string | null;
  }>({
    name: "",
    code: "",
    category: "",
    productType: "",
    image: null,
  });

  const [fontsLoaded] = useFonts({
    PlayfairBold: require("../assets/fonts/static/PlayfairDisplay-Bold.ttf"),
  });

  const modalScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(`${BACKEND_URL}/api/product/listofproducts`);
        let productsData = res.data.products || [];
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (editModalVisible && modalScrollRef.current) {
      setTimeout(() => {
        modalScrollRef.current?.scrollTo({ y: 0, animated: false });
      }, 100);
    }
  }, [editModalVisible]);

  const renderItem = ({ item }: { item: Product }) => (
    <View key={item._id} style={styles.card}>
      <Image
        source={{ uri: `${BACKEND_URL}/image/${item.image}` }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}>Code: {item.code}</Text>
        <Text style={styles.text}>Category: {item.category}</Text>
        <Text style={styles.text}>Product Type: {item.productType}</Text>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          setSelectedProduct(item);
          setFormData({
            name: item.name,
            code: item.code,
            category: item.category,
            productType: item.productType,
            image: `${BACKEND_URL}/image/${item.image}`,
          });
          setEditModalVisible(true);
        }}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const handleUpdate = async () => {
    if (!selectedProduct) return;
    const updatedData = {
      _id: selectedProduct._id,
      name: formData.name,
      code: formData.code,
      category: formData.category,
      productType: formData.productType,
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/api/product/editproduct`, updatedData);
      if (res.data.success) {
        alert("Product updated");
        setProducts((prev: Product[]) =>
          prev.map((p) =>
            p._id === selectedProduct._id ? { ...p, ...updatedData } : p
          )
        );
        setEditModalVisible(false);
      } else {
        alert(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error", err);
      alert("Error updating product");
    }
  };

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
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
      setFormData({ ...formData, image: uri });
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Products</Text>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />

      {editModalVisible && selectedProduct && (
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              ref={modalScrollRef}
              contentContainerStyle={styles.modalContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.header}>Edit Product</Text>

              {formData.image && (
                <TouchableOpacity onPress={handleImagePick}>
                  <Image
                    source={{ uri: formData.image }}
                    style={styles.previewImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}

              <Text>Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Name"
              />
              <Text>Code</Text>
              <TextInput
                style={styles.input}
                value={formData.code}
                onChangeText={(text) => setFormData({ ...formData, code: text })}
                placeholder="Code"
              />
              <Text>Category</Text>
              <TextInput
                style={styles.input}
                value={formData.category}
                onChangeText={(text) =>
                  setFormData({ ...formData, category: text })
                }
                placeholder="Category"
              />
              <Text>Product Type</Text>
              <TextInput
                style={styles.input}
                value={formData.productType}
                onChangeText={(text) =>
                  setFormData({ ...formData, productType: text })
                }
                placeholder="Product Type"
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: "#ccc", marginTop: 10 }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={[styles.saveText, { color: "#333" }]}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: "contain",
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#444",
    marginBottom: 2,
  },
  editButton: {
    marginTop: 30,
    marginRight: 10,
    alignSelf: "flex-start",
    backgroundColor: "#CE8B39",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "PlayfairBold",
    color: "#593C2D",
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 999,
    padding: 20,
  },
  modalContent: {
    paddingBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#CE8B39",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default ProductsListandeditcomponent;

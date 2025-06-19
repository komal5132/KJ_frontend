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
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const BACKEND_URL = "http://192.168.31.4:8000";

type Product = {
  _id: string;
  name: string;
  code: string;
  category: string;
  productType: string;
  image: string;
};

const AdminHome = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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
    image: "",
  });

  const [fontsLoaded] = useFonts({
    PlayfairBold: require("../../assets/fonts/static/PlayfairDisplay-Bold.ttf"),
  });

  const modalScrollRef = useRef<ScrollView>(null);

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
  useEffect(() => {
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
      {item.image ? (
        <Image
          source={{ uri: `${BACKEND_URL}/image/${item.image}` }}
          style={styles.image}
        />
      ) : (
        <View
          style={[
            styles.image,
            {
              backgroundColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text>No Image</Text>
        </View>
      )}
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
            image: item.image ? `${BACKEND_URL}/image/${item.image}` : null,
          });
          setEditModalVisible(true);
        }}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const handleUpdate = async () => {
    if (!selectedProduct) {
      console.warn("No product selected.");
      return;
    }

    let isImageChanged = false;

    if (formData.image && selectedProduct?.image) {
      const originalImageUrl = `${BACKEND_URL}/image/${selectedProduct.image}`;
      isImageChanged = !formData.image.includes(originalImageUrl);
    }

    let dataToSend;

    if (isImageChanged) {
      const form = new FormData();
      form.append("_id", selectedProduct._id);
      form.append("name", formData.name);
      form.append("code", formData.code);
      form.append("category", formData.category);
      form.append("productType", formData.productType);

      // Append image as file
      form.append("image", {
        uri: formData.image,
        name: "product.jpg",
        type: "image/jpeg",
      } as any);

      dataToSend = form;
    } else {
      // Image is not changed, send plain object
      dataToSend = {
        _id: selectedProduct._id,
        name: formData.name,
        code: formData.code,
        category: formData.category,
        productType: formData.productType,
      };
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/product/editproduct`,
        dataToSend,
        {
          headers: isImageChanged
            ? { "Content-Type": "multipart/form-data" }
            : {},
        }
      );

      if (res.data.success) {
        alert("Product updated");

        const updatedImage = isImageChanged
          ? res.data.updatedProduct?.image ?? selectedProduct.image
          : selectedProduct.image;

        setProducts((prev: Product[]) =>
          prev.map((p) =>
            p._id === selectedProduct._id
              ? {
                  ...p,
                  name: formData.name,
                  code: formData.code,
                  category: formData.category,
                  productType: formData.productType,
                  image: updatedImage,
                }
              : p
          )
        );
        await fetchData()
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
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  const handleDelete = async () => {
    if (!selectedProduct) {
      console.warn("No product selected for deletion.");
      return;
    }

    const pId = selectedProduct._id;

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/product/removeproducts/${pId}`
      );

      if (res.data.success) {
        alert("Product deleted");

        // Remove the deleted product from the list
        setProducts((prev: Product[]) =>
          prev.filter((p) => p._id !== selectedProduct._id)
        );

        setEditModalVisible(false);
        setSelectedProduct(null);
      } else {
        alert(res.data.message || "Deletion failed");
      }
    } catch (err) {
      console.error("Delete error", err);
      alert("Error deleting product");
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={{marginLeft:10,marginTop:2}} onPress={()=>router.push('/LoginSignUp')}>
        <Feather name="arrow-left-circle" size={25} color={"black"}/>
      </TouchableOpacity>
      <Text style={styles.header}>All Products</Text>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async()=>{
          setRefreshing(true)
          await fetchData()
          setRefreshing(false)
        }}
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
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="Name"
              />
              <Text>Code</Text>
              <TextInput
                style={styles.input}
                value={formData.code}
                onChangeText={(text) =>
                  setFormData({ ...formData, code: text })
                }
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

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    { width: 100, alignItems: "center" },
                  ]}
                  onPress={handleUpdate}
                >
                  <Text style={[styles.saveText]}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    {
                      width: 100,
                      alignItems: "center",
                      backgroundColor: "#9E0524",
                    },
                  ]}
                  onPress={handleDelete}
                >
                  <Text style={[[styles.saveText, { color: "white" }]]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  { backgroundColor: "#ccc", marginTop: 10 },
                ]}
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
    marginTop: 30,
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

export default AdminHome;

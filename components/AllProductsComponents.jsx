import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ImageViewer from "react-native-image-zoom-viewer";

const BACKEND_URL = "http://192.168.31.4:8000"; // Use your local IP or ngrok if needed

const AllProductsComponents = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true); // optional: show loader when category changes
    try {
      const res = await axios.post(`${BACKEND_URL}/api/product/listofproducts`);
      console.log("data of products", res.data);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
  console.log("selected prodcuts",selectedCategory)
}, [selectedCategory]); // ✅ Re-fetch on category change


  const openModal = (imageUri) => {
    setSelectedImage({ url: imageUri });
    setIsModalVisible(true);
  };

  const toggleFavorite = (id) => {
    const updated = products.map((p) =>
      p._id === id ? { ...p, isFavorite: !p.isFavorite } : p
    );
    setProducts(updated);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={() => openModal(`${BACKEND_URL}/image/${item.image}`)}>
          <Image
            source={{ uri: `${BACKEND_URL}/image/${item.image}` }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
        {item.isFavorite && (
          <View style={styles.productIdBadge}>
            <Text style={styles.productIdText}>{item.code}</Text>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item._id)}>
          <Ionicons
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={item.isFavorite ? "red" : "#999"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="green" style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
      <Modal visible={isModalVisible} transparent animationType="fade">
        <ImageViewer imageUrls={[selectedImage]} onSwipeDown={() => setIsModalVisible(false)} enableSwipeDown />
      </Modal>
    </View>
  );
};

export default AllProductsComponents;


const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#ffffff", 
    paddingBottom:160   
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  footer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    flexWrap: "wrap",
  },
  imageWrapper: {
    position: "relative",
  },

  productIdBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  productIdText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  modalImage: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";

const initialProducts = [
  {
    id: "1",
    name: "Malabar Earring",
    image: require("../assets/images/earring_1.webp"),
    isFavorite: false,
    ProductId: "ER1",
  },
  {
    id: "2",
    name: "Malabar Ring",
    image: require("../assets/images/ring_2.png"),
    isFavorite: false,
    ProductId: "RI1",
  },
  {
    id: "3",
    name: " Earring",
    image: require("../assets/images/earring_2.png"),
    isFavorite: false,
    ProductId: "ER2",
  },
  {
    id: "4",
    name: "Gold Bangle",
    image: require("../assets/images/categoryImage2.jpg"),
    isFavorite: false,
    ProductId: "BA1",
  },
  {
    id: "5",
    name: "Gold Mangtikka",
    image: require("../assets/images/mangtikka_1.png"),
    isFavorite: false,
    ProductId: "MG1",
  },
  {
    id: "6",
    name: "Necklace",
    image: require("../assets/images/necklace_1.png"),
    isFavorite: false,
    ProductId: "NC1",
  },
  {
    id: "7",
    name: "Ring",
    image: require("../assets/images/ring_1.png"),
    isFavorite: false,
    ProductId: "RI2",
  },
  {
    id: "8",
    name: "Gold Bangle",
    image: require("../assets/images/bangle_2.jpg"),
    isFavorite: false,
    ProductId: "BA2",
  },
  {
    id: "9",
    name: "Gold Bangle",
    image: require("../assets/images/bangle_3.png"),
    isFavorite: false,
    ProductId: "BA3",
  },
  {
    id: "10",
    name: "Mangtikka",
    image: require("../assets/images/mangtikka_2.png"),
    isFavorite: false,
    ProductId: "MG2",
  },
  {
    id: "11",
    name: "Necklace",
    image: require("../assets/images/necklace_2.png"),
    isFavorite: false,
    ProductId: "NC2",
  },
  {
    id: "12",
    name: " Earring",
    image: require("../assets/images/earring_2.png"),
    isFavorite: false,
    ProductId: "ER3",
  },
  {
    id: "13",
    name: "Malabar Earring",
    image: require("../assets/images/earring_1.webp"),
    isFavorite: false,
    ProductId: "ER4",
  },
  {
    id: "14",
    name: "Malabar Ring",
    image: require("../assets/images/ring_2.png"),
    isFavorite: false,
    ProductId: "RI3",
  },
  {
    id: "15",
    name: " Earring",
    image: require("../assets/images/earring_2.png"),
    isFavorite: false,
    ProductId: "ER5",
  },
  {
    id: "16",
    name: "Gold Bangle",
    image: require("../assets/images/categoryImage2.jpg"),
    isFavorite: false,
    ProductId: "BA4",
  },
  {
    id: "17",
    name: "Gold Mangtikka",
    image: require("../assets/images/mangtikka_1.png"),
    isFavorite: false,
    ProductId: "MG3",
  },
  {
    id: "18",
    name: "Necklace",
    image: require("../assets/images/necklace_1.png"),
    isFavorite: false,
    ProductId: "NC3",
  },
  {
    id: "19",
    name: "Ring",
    image: require("../assets/images/ring_1.png"),
    isFavorite: false,
    ProductId: "RI4",
  },
  {
    id: "20",
    name: "Gold Bangle",
    image: require("../assets/images/bangle_2.jpg"),
    isFavorite: false,
    ProductId: "BA5",
  },
  {
    id: "21",
    name: "Gold Bangle",
    image: require("../assets/images/bangle_3.png"),
    isFavorite: false,
    ProductId: "BA6",
  },
  {
    id: "22",
    name: "Mangtikka",
    image: require("../assets/images/mangtikka_2.png"),
    isFavorite: false,
    ProductId: "MG4",
  },
  {
    id: "23",
    name: "Necklace",
    image: require("../assets/images/necklace_2.png"),
    isFavorite: false,
    ProductId: "NC4",
  },
  {
    id: "24",
    name: " Earring",
    image: require("../assets/images/earring_2.png"),
    isFavorite: false,
    ProductId: "ER5",
  },
];

const AllProductsComponents = () => {
  const [products, setProducts] = useState(initialProducts);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalVisible(false);
  };

  const toggleFavorite = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, isFavorite: !product.isFavorite }
        : product
    );
    setProducts(updatedProducts);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={() => openModal(item.image)}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {item.isFavorite && (
            <View style={styles.productIdBadge}>
              <Text style={styles.productIdText}>{item.ProductId}</Text>
            </View>
          )}
        </View>
        <View style={styles.footer}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Ionicons
              name={item.isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={item.isFavorite ? "red" : "#999"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <ImageViewer
          imageUrls={[{props:{source:selectedImage}}]}
          onSwipeDown={() => setIsModalVisible(false)}
          enableSwipeDown={true}
        />
      </Modal>
    </View>
  );
};

export default AllProductsComponents;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#ffffff",
    paddingBottom: 60,
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

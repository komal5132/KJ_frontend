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
    Productcategory:"Earrings"
  },
  {
    id: "2",
    name: "Malabar Ring",
    image: require("../assets/images/ring_2.png"),
    isFavorite: false,
    ProductId: "RI1",
    Productcategory:"Rings"
  },
  {
    id: "3",
    name: " Earring",
    image: require("../assets/images/earring_2.png"),
    isFavorite: false,
    ProductId: "ER2",
    Productcategory:"Earrings"
  },
  {
    id: "4",
    name: "Gold Bangle",
    image: require("../assets/images/categoryImage2.jpg"),
    isFavorite: false,
    ProductId: "BA1",
    Productcategory:"Bangles"
  },
  {
    id: "5",
    name: "Gold Mangtikka",
    image: require("../assets/images/mangtikka_1.png"),
    isFavorite: false,
    ProductId: "MG1",
    Productcategory:"Mangtikkas"
  },
  {
    id: "6",
    name: "Necklace",
    image: require("../assets/images/necklace_1.png"),
    isFavorite: false,
    ProductId: "NC1",
    Productcategory:"Necklace"
  },
  {
    id: "7",
    name: "Ring",
    image: require("../assets/images/ring_1.png"),
    isFavorite: false,
    ProductId: "RI2",
    Productcategory:"Rings"
  },
  {
    id: "8",
    name: "Gold Bangle",
    image: require("../assets/images/bangle_2.jpg"),
    isFavorite: false,
    ProductId: "BA2",
    Productcategory:"Bangles"
  },
  {
    id: "9",
    name: "Gold Bangle",
    image: require("../assets/images/bangle_3.png"),
    isFavorite: false,
    ProductId: "BA3",
    Productcategory:"Bangles"
  },
  {
    id: "10",
    name: "Mangtikka",
    image: require("../assets/images/mangtikka_2.png"),
    isFavorite: false,
    ProductId: "MG2",
    Productcategory:"Mangtikkas"
  },
  {
    id: "11",
    name: "Necklace",
    image: require("../assets/images/necklace_2.png"),
    isFavorite: false,
    ProductId: "NC2",
    Productcategory:"Necklace"
  },
  {
    id: "12",
    name: " Earring",
    image: require("../assets/images/earring_2.png"),
    isFavorite: false,
    ProductId: "ER3",
    Productcategory:"Earrings"
  },
  {
    id: "13",
    name: "Malabar Earring",
    image: require("../assets/images/earring_1.webp"),
    isFavorite: false,
    ProductId: "ER4",
    Productcategory:"Earrings"
  },
  {
    id: "14",
    name: "Malabar Ring",
    image: require("../assets/images/ring_2.png"),
    isFavorite: false,
    ProductId: "RI3",
    Productcategory:"Rings"
  },
  {
    id: "15",
    name: " Earring",
    image: require("../assets/images/earring_2.png"),
    isFavorite: false,
    ProductId: "ER5",
    Productcategory:"Earrings"
  },
  {
    id: "16",
    name: "Gold Bangle",
    image: require("../assets/images/categoryImage2.jpg"),
    isFavorite: false,
    ProductId: "BA4",
    Productcategory:"Bangles"
  },
  {
    id: "17",
    name: "Gold Mangtikka",
    image: require("../assets/images/mangtikka_1.png"),
    isFavorite: false,
    ProductId: "MG3",
    Productcategory:"Mangtikkas"
  },
  {
    id: "18",
    name: "Necklace",
    image: require("../assets/images/necklace_1.png"),
    isFavorite: false,
    ProductId: "NC3",
    Productcategory:"Necklace"
  },
  {
    id: "19",
    name: "Ring",
    image: require("../assets/images/ring_1.png"),
    isFavorite: false,
    ProductId: "RI4",
    Productcategory:"Rings"
  },
  {
    id: "20",
    name: "Gold Bangle",
    image: require("../assets/images/bangle_2.jpg"),
    isFavorite: false,
    ProductId: "BA5",
    Productcategory:"Bangles"
  },
  {
    id: "21",
    name: "Gold Bangle",
    image: require("../assets/images/bangle_3.png"),
    isFavorite: false,
    ProductId: "BA6",
    Productcategory:"Bangles"
  },
  {
    id: "22",
    name: "Mangtikka",
    image: require("../assets/images/mangtikka_2.png"),
    isFavorite: false,
    ProductId: "MG4",
    Productcategory:"Mangtikkas"
  },
  {
    id: "23",
    name: "Necklace",
    image: require("../assets/images/necklace_2.png"),
    isFavorite: false,
    ProductId: "NC4",
    Productcategory:"Necklace"
  },
  {
    id: "24",
    name: " Earring",
    image: require("../assets/images/earring_2.png"),
    isFavorite: false,
    ProductId: "ER5",
    Productcategory:"Earrings"
  },
];

const AllProductsComponents = ({ selectedCategory }) => {
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

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.Productcategory === selectedCategory);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={() => openModal(item.image)}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
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
            name={item.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={item.isFavorite ? 'red' : '#999'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex:1}}>
      <FlatList
        data={filteredProducts}
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
          imageUrls={[{ props: { source: selectedImage } }]}
          onSwipeDown={closeModal}
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

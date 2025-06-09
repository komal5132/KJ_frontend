import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";

const newProductData = [
  {
    id: 6,
    productImage: require("../assets/images/trending6.jpg"),
    productText: "Gold Earring",
    isFavorite: false,
    ProductId: "BA7",
    Productcategory:""
  },
  {
    id: 4,
    productImage: require("../assets/images/trending4.jpg"),
    productText: "Gold Ring",
    isFavorite: false,
    ProductId: "BA7",
    Productcategory:""
  },
  {
    id: 1,
    productImage: require("../assets/images/trending88.png"),
    productText: "Gold Bangle",
    isFavorite: false,
    ProductId: "BA7",
    Productcategory:""
  },
  {
    id: 5,
    productImage: require("../assets/images/trending3avif.png"),
    productText: "Gold Ring",
    isFavorite: false,
    ProductId: "BA7",
    Productcategory:""
  },
  {
    id: 8,
    productImage: require("../assets/images/trending1.jpg"),
    productText: "Gold Necklace",
    isFavorite: false,
    ProductId: "BA7",
    Productcategory:""
  },
  {
    id: 2,
    productImage: require("../assets/images/trending5.jpg"),
    productText: "Gold Earring",
    isFavorite: false,
    ProductId: "BA7",
    Productcategory:""
  },
  {
    id: 7,
    productImage: require("../assets/images/trending7.png"),
    productText: "Gold Bangle",
    isFavorite: false,
    ProductId: "BA7",
    Productcategory:""
  },
];
const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.45;

const NewProducts: React.FC = () => {
  const [trendingData, setTrendingData] = useState(newProductData);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (productImage: any) => {
    setSelectedImage(productImage);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalVisible(false);
  };

  const toggleHeart = (id: number) => {
    const updatedData = trendingData.map((item: any) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setTrendingData(updatedData);
  };

  const handleRender = ({ item }: { item: (typeof newProductData)[0] }) => {
    return (
      <View style={styles.productWrapper}>
        <TouchableOpacity onPress={() => openModal(item.productImage)}>
          <View style={styles.imageContainer}>
            <Image source={item.productImage} style={styles.image} />
            {item.isFavorite && (
              <View style={styles.productIdBadge}>
                <Text style={styles.productIdText}>{item.ProductId}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.heartIcon}
              onPress={() => toggleHeart(item.id)}
            >
              <Ionicons
                name={item.isFavorite ? "heart" : "heart-outline"}
                size={16}
                color={item.isFavorite ? "red" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Text style={styles.productTitle}>{item.productText}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Modal for enlarged image */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        {selectedImage && (
          <ImageViewer
            imageUrls={[{ url: "", props: { source: selectedImage } }]}
            onSwipeDown={closeModal}
            enableSwipeDown={true}
          />
        )}
      </Modal>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Arrivals</Text>
      </View>

      <FlatList
        data={trendingData}
        renderItem={handleRender}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingVertical: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 14,
    color: "green",
    fontWeight: "600",
  },
  flatListContainer: {
    gap: 12,
  },
  productWrapper: {
    width: imageWidth,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 180,
    height: 150,
    borderRadius: 12,
    resizeMode: "cover",
  },
  heartIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 15,
    elevation: 2,
  },
  productTitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  brandText: {
    fontSize: 12,
    color: "#666",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "60%",
    resizeMode: "contain",
    borderRadius: 12,
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
});

export default NewProducts;

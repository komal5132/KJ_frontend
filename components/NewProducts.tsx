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

const newProductData = [
  {
    id: 6,
    productImage: require("../assets/images/trending6.jpg"),
    productText: "Gold Earring",
  },
  {
    id: 4,
    productImage: require("../assets/images/trending4.jpg"),
    productText: "Gold Ring",
  },
  {
    id: 1,
    productImage: require("../assets/images/trending88.png"),
    productText: "Gold Bangle",
  },
  {
    id: 5,
    productImage: require("../assets/images/trending3avif.png"),
    productText: "Gold Ring",
  },
  {
    id: 8,
    productImage: require("../assets/images/trending1.jpg"),
    productText: "Gold Necklace",
  },
  {
    id: 2,
    productImage: require("../assets/images/trending5.jpg"),
    productText: "Gold Earring",
  },
  {
    id: 7,
    productImage: require("../assets/images/trending7.png"),
    productText: "Gold Bangle",
  },
];
const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.45;

const NewProducts: React.FC = () => {
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const toggleHeart = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openImageModal = (image: any) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleRender = ({ item }: { item: (typeof newProductData)[0] }) => {
    const isLiked = likedItems.includes(item.id);

    return (
      <View style={styles.productWrapper}>
        <TouchableOpacity onPress={() => openImageModal(item.productImage)}>
          <View style={styles.imageContainer}>
            <Image source={item.productImage} style={styles.image} />
            <TouchableOpacity
              style={styles.heartIcon}
              onPress={() => toggleHeart(item.id)}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={16}
                color={isLiked ? "red" : "gray"}
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
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <Image source={selectedImage} style={styles.fullImage} />
        </Pressable>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Arrivals</Text>        
      </View>

      <FlatList
        data={newProductData}
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
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '60%',
    resizeMode: 'contain',
    borderRadius: 12,
  },
});

export default NewProducts;

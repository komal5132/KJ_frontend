import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.45;

type Product = {
  image: string;
  name: string;
  code: string;
  category: string;
  description: string;
  isFavorite: boolean;
  productImage: { uri: string };
  productText: string;
  ProductId: string;
};

const BaseUrl = "http://192.168.31.4:8000"

const TrendingComponents = () => {
  const [trendingData, setTrendingData] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        setUserId(id);

        const productsRes = await axios.post(
          `${BaseUrl}/api/product/listofproducts?productType=trending`
        );
        const products = productsRes.data.products;
        console.log("these are trending products", products);

        const favRes = await axios.post(
          `${BaseUrl}/api/user/getFavorites`,
          {
            userId: id,
          }
        );
        const likedProductIds = favRes.data.favorites; // Example: ['BA7', 'RI5']

        const formattedProducts = products.map((item: any) => ({
          ...item,
          isFavorite: likedProductIds.includes(item.code),
          productImage: { uri: `${BaseUrl}/image/${item.image}` },
          productText: item.name,
          ProductId: item.code,
        }));

        setTrendingData(formattedProducts);
      } catch (error) {
        console.error("Error loading trending products:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalVisible(false);
  };

  const toggleHeart = async (code: string) => {
    try {
      const updatedData = trendingData.map((item) =>
        item.code === code ? { ...item, isFavorite: !item.isFavorite } : item
      );
      setTrendingData(updatedData);

      console.log("code =", code, "userid", userId);

      await axios.post(`${BaseUrl}/api/user/favProduct`, {
        userId,
        productCode: code,
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleRender = ({ item }: { item: Product }) => {
    return (
      <View style={styles.productWrapper}>
        <TouchableOpacity onPress={() => openModal(item.productImage.uri)}>
          <View style={styles.imageContainer}>
            <Image source={item.productImage} style={styles.image} />
            {item.isFavorite && (
              <View style={styles.productIdBadge}>
                <Text style={styles.productIdText}>{item.ProductId}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.heartIcon}
              onPress={() => toggleHeart(item.code)}
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
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        {selectedImage && (
          <ImageViewer
            imageUrls={[{ url: selectedImage }]}
            onSwipeDown={closeModal}
            enableSwipeDown={true}
          />
        )}
      </Modal>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trending Products</Text>
      </View>

      <FlatList
        data={trendingData}
        renderItem={handleRender}
        keyExtractor={(item) => item.code}
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

export default TrendingComponents;

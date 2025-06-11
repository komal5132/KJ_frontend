import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const dummyData = [
  { id: "1", title: "Rings", image: require("@/assets/images/ring.png") },
  {
    id: "2",
    title: "Bangles",
    image: require("@/assets/images/categoryImage2.jpg"),
  },
  {
    id: "3",
    title: "Earrings",
    image: require("@/assets/images/categoryImage3.jpg"),
  },
  {
    id: "4",
    title: "Necklace",
    image: require("@/assets/images/categoryImage5.jpg"),
  },
  {
    id: "5",
    title: "Mangtikkas",
    image: require("@/assets/images/mangtikka_1.png"),
  },
];

const SearchScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredData = dummyData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item: any) => {
    const updated = recentSearches.filter((i) => i.title !== item.title);
    const newList = [item, ...updated].slice(0, 3);
    setRecentSearches(newList);
    setSearchQuery("");
    router.push({
      pathname: "/Products",
      params: { selectedCategory: item.title },
    });
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="chevron-back-outline"
        onPress={() => router.push("/(Tab)")}
        size={30}
        color={"black"}
      />

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search items..."
          placeholderTextColor="#888"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
        {searchQuery !== "" && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close"
              size={20}
              color="#888"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Show results when something is searched */}
      {searchQuery !== "" ? (
        filteredData.length === 0 ? (
          <Text style={styles.noResults}>No results found</Text>
        ) : (
          <>
            <Text style={styles.resultsText}>Search Results</Text>
            <FlatList
              data={filteredData.slice(0, 3)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => handleSelect(item)}
                >
                  <Image source={item.image} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        )
      ) : recentSearches.length > 0 ? (
        <>
          <Text style={styles.resultsText}>Recent Searches</Text>
          <FlatList
            data={recentSearches}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => handleSelect(item)}
              >
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      ) : null}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, top: 40 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 16,
  },

  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  resultsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noResults: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

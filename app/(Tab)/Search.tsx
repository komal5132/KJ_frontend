import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const dummyData = [
  { id: '1', title: 'Gold Ring', image: require('@/assets/images/ring.png') },
  { id: '2', title: 'Gold Nosepin',image: require('@/assets/images/nosepin.png') },
  // Add more dummy items or fetch from backend
];

const SearchScreen = () => {

    const router=useRouter()

  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = dummyData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>

<Ionicons name='chevron-back-outline' onPress={()=>router.push('/(Tab)')} size={30} color={"black"}/>

      {/* Search Input */}
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
      </View>

      {/* Results */}
      <Text style={styles.resultsText}>Searched Items</Text>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 ,top:40},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    marginTop:16
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  resultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
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
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSub: {
    color: '#777',
    fontSize: 13,
    marginVertical: 2,
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
});

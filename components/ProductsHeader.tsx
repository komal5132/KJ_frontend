import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductsHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>All Products</Text>

      <View style={styles.iconContainer}>
        {/* Search icon (can be used to go to search screen) */}
        <TouchableOpacity onPress={() => {/* navigate to search screen */}}>
          <Ionicons name="search" size={24} color="#333" style={styles.icon} />
        </TouchableOpacity>

        {/* Filter icon (optional: open filter modal) */}
        <TouchableOpacity onPress={() => {/* open filter modal */}}>
          <Ionicons name="filter" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    marginRight: 12,
  },
});

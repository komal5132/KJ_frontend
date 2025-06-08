import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Dimensions
} from 'react-native'

const CategoriesData = [
  {
    id: 1,
    categoryName: 'Rings',
    categoryImage: require('../assets/images/categoryImage1.png')
  },
  {
    id: 2,
    categoryName: 'Bangles',
    categoryImage: require('../assets/images/categoryImage2.jpg')
  },
  {
    id: 3,
    categoryName: 'Earrings',
    categoryImage: require('../assets/images/categoryImage3.jpg')
  },
  {
    id: 4,
    categoryName: 'Bracelet',
    categoryImage: require('../assets/images/categoryImage4.png')
  },
  {
    id: 5,
    categoryName: 'Necklace',
    categoryImage: require('../assets/images/categoryImage5.jpg')
  },
  {
    id: 6,
    categoryName: 'Brooches',
    categoryImage: require('../assets/images/categoryImage6.png')
  },
  {
    id: 7,
    categoryName: 'Anklets',
    categoryImage: require('../assets/images/categoryImage7.jpg')
  }
]

const screenWidth = Dimensions.get('window').width

const CategoriesComponent = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleRender = ({ item }: { item: typeof CategoriesData[0] }) => (
    <TouchableOpacity style={styles.category}>
      <Image style={styles.catImage} source={item.categoryImage} />
      <Text style={styles.catText}>{item.categoryName}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={CategoriesData}
        renderItem={handleRender}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {/* Overlay Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.overlayContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>All Categories</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>

            <FlatList
              data={CategoriesData}
              renderItem={handleRender}
              keyExtractor={item => `${item.id}`}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    backgroundColor: '#fff',        
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,    
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',    
  },
  seeAll: {
    fontSize: 14,
    color: 'green',
    fontWeight: '600',    
  },
  category: {
    alignItems: 'center',
    marginBottom: 20,
    width: (screenWidth - 80) / 3, // adjust spacing        
  },
  catImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
    resizeMode: 'cover'
  },
  catText: {
    fontSize: 13,
    color: '#333'
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  closeText: {
    fontSize: 14,
    color: 'red',
    fontWeight: '600'
  }
})

export default CategoriesComponent

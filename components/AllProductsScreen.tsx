import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'

const screenWidth = Dimensions.get('window').width

const CategoriesData = [
  {
    id: 1,
    categoryName: 'Gold',
    categoryImage: require('../assets/images/gold_type.webp')
  },
  {
    id: 2,
    categoryName: 'Silver',
    categoryImage: require('../assets/images/silver_type.webp')
  },
  {
    id: 3,
    categoryName: 'Diamond',
    categoryImage: require('../assets/images/diamond_type.jpg')
  },
  {
    id: 4,
    categoryName: 'Platinum',
    categoryImage: require('../assets/images/platinum_type.webp')
  },
  {
    id: 5,
    categoryName: 'Kundan',
    categoryImage: require('../assets/images/kundan_type.jpg')
  },  
]

const AllProductsScreen = () => {
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
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginTop:10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    fontWeight: '600'
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


export default AllProductsScreen
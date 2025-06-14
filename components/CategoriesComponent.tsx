import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Dimensions,
  ImageSourcePropType,
  ListRenderItemInfo
} from 'react-native'

type CategoryType = {
  _id: string | number
  name: string
  image: string | number
}

type Props = {
  selectedCategory: string
  onCategorySelect: (category: string) => void  
}

const screenWidth = Dimensions.get('window').width

const CategoriesComponent: React.FC<Props> = ({ selectedCategory, onCategorySelect }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.post('http://192.168.31.4:8000/api/product/getcategory')              
        setCategories(res.data.categories || [])            
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
      finally{  
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleRender = ({ item }: ListRenderItemInfo<CategoryType>) => (
    <TouchableOpacity
      style={[
        styles.category,
        selectedCategory === item.name && { borderBottomWidth: 2, borderBottomColor: 'green' }
      ]}
      onPress={() => {
        setModalVisible(false)
        onCategorySelect(item.name)
        router.push({
          pathname: '/Products',
          params: { selectedCategory: item.name }
        })
      }}
    >
      <Image style={styles.catImage} source={typeof item.image === 'string' ? {uri : `http://192.168.31.4:8000/image/${item.image}`}:item.image} />
      <Text style={styles.catText}>{item.name}</Text>      
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
        data={[{ _id: 0, name: 'All', image: require('../assets/images/kundan_type.jpg') }, ...categories]}
        renderItem={handleRender}
        keyExtractor={(item) => `${item._id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

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
              data={categories}
              renderItem={handleRender}
              keyExtractor={(item) => `${item._id}`}
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
    width: (screenWidth - 80) / 3,
  },
  catImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
    resizeMode: 'cover',
  },
  catText: {
    fontSize: 13,
    color: '#333',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeText: {
    fontSize: 14,
    color: 'red',
    fontWeight: '600',
  },
})

export default CategoriesComponent

import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ProductsHeader from '@/components/ProductsHeader'
import CategoriesComponent from '@/components/CategoriesComponent'
import AllProductsComponents from '@/components/AllProductsComponents'

const Products = () => {
  return (
    <View style={{top:40,flex:1}}>
      <ProductsHeader/>
      <CategoriesComponent/>      
      <AllProductsComponents/>
    </View>
  )
}

export default Products
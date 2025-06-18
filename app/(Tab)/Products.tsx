import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductsHeader from '@/components/ProductsHeader';
import CategoriesComponent from '@/components/CategoriesComponent';
import AllProductsComponents from '@/components/AllProductsComponents';
import { useLocalSearchParams } from 'expo-router';

const Products = () => {
   const { selectedCategory: categoryParam } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (categoryParam && typeof categoryParam === 'string') {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);  

  return (
    <View style={{ top: 40, flex: 1 }}>
      <ProductsHeader />
      <CategoriesComponent
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <AllProductsComponents selectedCategory={selectedCategory} />
    </View>
  );
};

export default Products;

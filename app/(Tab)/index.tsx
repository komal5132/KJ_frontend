import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import HomeTopSection from "@/components/HomeTopSection";
import HomeDiscountSection from "@/components/HomeDiscountSection";
import CategoriesComponent from "@/components/CategoriesComponent";
import TrendingComponents from "@/components/TrendingComponents";
import NewProducts from "@/components/NewProducts";
import Hallmarkcomponent from "@/components/Hallmarkcomponent";
import AllProductsScreen from "@/components/AllProductsScreen";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { username } = useLocalSearchParams();

  return (
    <ScrollView
      style={{ backgroundColor: "#fff", paddingTop: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <HomeTopSection name={username as string} />
      <HomeDiscountSection />
      <CategoriesComponent
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <TrendingComponents />
      <NewProducts />
      <Hallmarkcomponent />
      <AllProductsScreen />
    </ScrollView>
  );
};

export default Home;

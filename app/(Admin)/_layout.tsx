import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Admin = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="AdminHome"
        options={{
          title: "Products",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="necklace" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AdminSecondScreen"
        options={{
          title: "Add Products",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="card-plus" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Admin;

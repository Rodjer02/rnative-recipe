import { StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenNavigation from "./HomeScreenNavigation";
import FavoritesScreen from "../screens/FavoritesScreen";

import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../assets/constants/colors";
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: colors.amber800,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        options={{
          tabBarLabel: "Recipes",
          tabBarIcon: ({ focused, size, color }) => {
            return <Entypo name="bowl" color={color} size={size} />;
          },
        }}
        component={HomeScreenNavigation}
      />
      <Tab.Screen
        name="FavoritesTab"
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ focused, size, color }) => {
            return <Ionicons name="heart" color={color} size={size} />;
          },
        }}
        component={FavoritesScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});

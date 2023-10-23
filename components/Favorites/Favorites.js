import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
function Favorites({ favorite }) {
  const navigation = useNavigation();

  const onPressCard = () => {
    navigation.navigate("RecipeDetail", {
      recipeId: favorite.idMeal,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPressCard}>
      <Image
        source={{ uri: favorite.strMealThumb }}
        style={styles.recipeImage}
      />
      <Text numberOfLines={1} style={styles.text}>
        {favorite.strMeal}
      </Text>
    </TouchableOpacity>
  );
}

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  recipeImage: {
    height: 250,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});

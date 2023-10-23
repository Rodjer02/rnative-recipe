import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "../../assets/constants/colors";
import { useDispatch } from "react-redux";
import { updateActiveCategory } from "../../store/categoriesSlice";
import { fetchRecipes } from "../../store/recipesSlice";

const Category = ({ name, thumbnail, isActive }) => {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(updateActiveCategory(name));
    dispatch(fetchRecipes(name));
  };
  const backgroundColor = isActive
    ? colors.amber400
    : "rgba(177, 177, 177, 0.4)";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.imageWrapper, { backgroundColor }]}>
        <Image style={styles.image} source={{ uri: thumbnail }} />
      </View>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
  text: {
    textAlign: "center",
  },
  imageWrapper: {
    width: 70,
    height: 70,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 999,
    overflow: "hidden",
  },
  image: {
    width: "75%",
    height: "75%",
    borderRadius: 999,
  },
});

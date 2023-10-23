import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaView from "../components/SafeAreaView/SafeAreaView";
import Favorites from "../components/Favorites/Favorites";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesScreen = () => {
  const [favorite, setFavorite] = useState([]);
  const addFavorite = useSelector((state) => state.recipes.favorite);
  useEffect(() => {
    (async () => {
      let newFavorite = (await AsyncStorage.getItem("my-Favorits")) || "[]";
      setFavorite(JSON.parse(newFavorite));
    })();
  }, [addFavorite]);
  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        ListHeaderComponent={<Text style={styles.text}>My Favorites</Text>}
        ListFooterComponent={
          <FlatList
            data={favorite}
            numColumns={2}
            renderItem={({ item }) => {
              return <Favorites favorite={item} />;
            }}
            keyExtractor={(item) => item.idMeal}
            style={styles.recipeList}
            columnWrapperStyle={styles.recipeListColumnWrapper}
          />
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 20,
  },
  heading: {
    fontWeight: "600",
    fontSize: 20,
  },
  recipeList: {
    gap: 18,
    paddingHorizontal: 15,
  },
  recipeListColumnWrapper: {
    justifyContent: "space-between",
    gap: 12,
  },
  text: {
    fontSize: 35,
    padding: 15,
  },
});

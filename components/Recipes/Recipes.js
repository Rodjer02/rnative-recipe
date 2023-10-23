import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Recipe from "../Recipe/Recipe";
import { useSelector } from "react-redux";

const Recipes = ({ inputText }) => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const loaded = useSelector((state) => state.recipes.loaded);

  const [showingRecipes, setShowingRecipes] = useState([]);
  useEffect(() => {
    const searchInputText = recipes.filter(
      (recipe) => !recipe.strMeal.indexOf(inputText)
    );

    setShowingRecipes(searchInputText);
  }, [inputText]);
  useEffect(() => {
    setShowingRecipes(recipes);
  }, [recipes]);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recipes</Text>
      {loaded ? (
        <FlatList
          data={showingRecipes}
          numColumns={2}
          renderItem={({ item }) => {
            return <Recipe recipe={item} />;
          }}
          keyExtractor={(item) => item.idMeal}
          style={styles.recipeList}
          columnWrapperStyle={styles.recipeListColumnWrapper}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};
export default Recipes;
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
  },
  recipeListColumnWrapper: {
    justifyContent: "space-between",
    gap: 12,
  },
});

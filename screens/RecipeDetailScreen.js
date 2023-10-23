import {
  ActivityIndicator,
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SafeAreaView from "../components/SafeAreaView/SafeAreaView";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Octicons from "react-native-vector-icons/Octicons";
import AdditionaRecipeDataCard from "../components/AdditionaRecipeDataCard/AdditionaRecipeDataCard";
import Ingredients from "../components/Ingredients/Ingredients";
import VideoInstruction from "../components/VideoInstruction/VideoInstruction";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getRecipeById } from "../lib/getRecipeById";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../store/recipesSlice";

const additionalData = [
  {
    title: "35",
    subtitle: "Mins",
    icon: <Feather name="clock" size={26} />,
  },
  {
    title: "03",
    subtitle: "Servings",
    icon: <Ionicons name="people" size={26} />,
  },
  {
    title: "103",
    subtitle: "Cal",
    icon: <SimpleLineIcons name="fire" size={26} />,
  },
  {
    title: "",
    subtitle: "Easy",
    icon: <Octicons name="stack" size={26} />,
  },
];

const RecipeDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const youtubeVideoId = recipe?.strYoutube && recipe.strYoutube.split("=")[1];
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await getRecipeById(route.params.recipeId);
      setRecipe(res.meals[0]);
    })();
  }, []);
  //   const myFavorites = AsyncStorage.getItem("my-Favorits") || [""];
  const onPress = async () => {
    let favorite = (await AsyncStorage.getItem("my-Favorits")) || "[]";

    if (!isFavorite) {
      favorite = JSON.parse(favorite);
      favorite.push(recipe);
    }
    setIsFavorite(!isFavorite);
    await AsyncStorage.setItem("my-Favorits", JSON.stringify(favorite));
    dispatch(addFavorite(recipe));
  };

  if (!recipe) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
        >
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.headerIcon}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            color={isFavorite ? "red" : "#000"}
            size={30}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.recipeImage} />
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{recipe.strMeal}</Text>
          <Text style={styles.country}>{recipe.strArea}</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.additionalDataContent}
        >
          {additionalData.map((data, index) => {
            return <AdditionaRecipeDataCard key={index} {...data} />;
          })}
        </ScrollView>
        <Ingredients recipe={recipe} />
        <View>
          <Text style={styles.subhead}>Instruction</Text>
          <Text>{recipe.strInstructions}</Text>
        </View>
        {/* <VideoInstruction videoId={youtubeVideoId} /> */}
      </View>
    </ScrollView>
  );
};
export default RecipeDetailScreen;
const styles = StyleSheet.create({
  header: {
    position: "absolute",
    justifyContent: "space-between",
    flexDirection: "row",
    left: 20,
    right: 20,
    top: 20,
    zIndex: 1,
  },
  headerIcon: { backgroundColor: "#fff", padding: 8, borderRadius: 99 },
  container: {
    flex: 1,
  },
  recipeImage: {
    alignSelf: "center",
    width: "100%",
    height: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: { paddingHorizontal: 15, marginTop: 32, gap: 15 },
  title: { fontWeight: "800", fontSize: 28 },
  subhead: { fontWeight: "800", fontSize: 22, marginBottom: 16 },
  country: { color: "gray", fontSize: 16 },
  additionalDataContent: { width: "100%", justifyContent: "space-around" },
});

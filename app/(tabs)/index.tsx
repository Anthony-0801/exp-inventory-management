import { useRouter } from "expo-router";
import * as React from "react";
import {
  View,
  Pressable,
  Platform,
  useColorScheme,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card as UICard } from "~/components/ui/card";
import { H1, H2, P } from "~/components/ui/typography";
import { images } from "~/constants/images";

const Card = ({
  index,
  title,
  image,
  selectedCard,
  hoveredCard,
  isDarkMode,
  onLongPress,
  onPressOut,
  onMouseEnter,
  onMouseLeave,
  onPress,
}: CardProps) => {
  return (
    <Pressable
      key={index}
      onLongPress={() => onLongPress(index)}
      onPressOut={onPressOut}
      //onMouseEnter={() => onMouseEnter && onMouseEnter(index)}
      //onMouseLeave={onMouseLeave}
      onPress={() => onLongPress(index)}
      className="w-[45%] border border-black rounded-2xl"
    >
      <UICard
        className={`w-full h-[17.5rem] rounded-2xl shadow-md shadow-background/5 ${
          selectedCard === index || hoveredCard === index
            ? "bg-sky-500"
            : "bg-secondary/30"
        }`}
      >
        <ImageBackground
          source={image}
          className="w-full h-[15rem] rounded-2xl"
          resizeMode="cover"
          imageStyle={{ borderRadius: 10 }}
        />
        <P
          className={`text-lg font-semibold text-center mt-2 ${
            selectedCard === index || hoveredCard === index
              ? "text-black"
              : isDarkMode
              ? "text-white"
              : "text-black"
          }`}
        >
          {title}
        </P>
      </UICard>
    </Pressable>
  );
};

export default function Screen() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
  const colorScheme = useColorScheme(); // Detect light or dark mode
  const isDarkMode = colorScheme === "dark";

  const handleLongPress = (index: number) => {
    setSelectedCard(index);

      // Redirect to the InventoryListing page with the selected category
      const category = cardsData[index].value.toLowerCase(); // Use the card title as the category
      router.push(`/inventories/inventory-listing?category=${category}`);
  };

  const handlePressOut = () => {
    setSelectedCard(null); // Reset the background color when the press is released
  };

  const handleMouseEnter = (index: number) => {
    if (Platform.OS === "web") {
      setHoveredCard(index);
    }
  };

  const handleMouseLeave = () => {
    if (Platform.OS === "web") {
      setHoveredCard(null);
    }
  };

  const cardsData = [
    { title: "House", image: images.houses, value: "addresses" },
    { title: "Beverages", image: images.beverages, value: "beers" },
    { title: "Appliances", image: images.appliances, value: "appliances" },
    { title: "People", image: images.people, value: "users" },
  ];

  return (
    <>
      <View className="p-6 bg-secondary/30">
        <H1 className="text-2xl font-bold">Categories</H1>
      </View>

      <View className="flex-1 flex-wrap justify-center flex-row mt-2 gap-4">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            index={index}
            title={card.title}
            image={card.image}
            selectedCard={selectedCard}
            hoveredCard={hoveredCard}
            isDarkMode={isDarkMode}
            onLongPress={handleLongPress}
            onPressOut={handlePressOut}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            value={card.value}
            onPress={handleLongPress}
          />
        ))}
      </View>
    </>
  );
}

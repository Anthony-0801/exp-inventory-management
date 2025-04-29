import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { fetchAllCategories } from "~/services/api";

import { icons } from "~/constants/icons";
import { images } from "~/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

function TabIcon({ focused, icon, title }: any) {
  const colorScheme = useColorScheme(); // Detect light or dark mode
  const isDarkMode = colorScheme === "dark";

  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row h-screen w-full min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor="#FAF9F6" className="size-5" />
        <Text
          className={`text-base font-semibold ml-2 ${
            isDarkMode ? "text-white" : "text-secondary"
          }`}
        >
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} className="size-5" />
    </View>
  );
}

const TabsLayout = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { t } = useTranslation();

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const filteredData = await fetchAllCategories(searchQuery);

        // Navigate to inventories-listing with the filtered data
        router.push({
          pathname: "/inventories/inventories-listing",
          params: { results: JSON.stringify(filteredData) },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary/30">
      {/* Search Bar */}
      <View className="flex-row items-center justify-center mt-4 mb-2">
        <TextInput
          className="w-11/12 h-12 text-black bg-white rounded-xl border border-black shadow-lg shadow-foreground/5 px-4"
          placeholder={t('search_placeholder')}
          placeholderTextColor="#A1A1AA"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} // Trigger search on Enter/Return key
        />
      </View>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            borderRadius: 10,
            marginHorizontal: 20,
            marginBottom: 10,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            backgroundColor: "white",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "index",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.house} title="Home" />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "settings",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={icons.settings}
                title="Settings"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.user} title="Profile" />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;
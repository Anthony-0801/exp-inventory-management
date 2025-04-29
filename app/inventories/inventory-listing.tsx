import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "~/services/useFetch";
import { fetchCategoryItems } from "~/services/api";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useColorScheme } from "react-native";
import { icons } from "~/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InventoryListing() {
  const { category } = useLocalSearchParams(); // Get the selected category from the URL
  const { data, loading, error } = useFetch(() =>
    fetchCategoryItems(category as string)
  );
  const router = useRouter(); // For navigation
  const colorScheme = useColorScheme(); // Detect light or dark mode
  const isDarkMode = colorScheme === "dark";

  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [filteredData, setFilteredData] = useState<any[]>([]); // State for filtered data
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const itemsPerPage = 10; // Number of items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get the items for the current page
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Filter data based on the search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredData(data || []); // Reset to original data if query is empty
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = (data || []).filter((item: any) => {
        switch (category) {
          case "users":
            return (
              item.first_name.toLowerCase().includes(lowerCaseQuery) ||
              item.last_name.toLowerCase().includes(lowerCaseQuery) ||
              item.email.toLowerCase().includes(lowerCaseQuery)
            );
          case "appliances":
            return (
              item.equipment.toLowerCase().includes(lowerCaseQuery) ||
              item.brand.toLowerCase().includes(lowerCaseQuery)
            );
          case "beers":
            return (
              item.name.toLowerCase().includes(lowerCaseQuery) ||
              item.style.toLowerCase().includes(lowerCaseQuery)
            );
          case "addresses":
            return (
              item.street_address.toLowerCase().includes(lowerCaseQuery) ||
              item.city.toLowerCase().includes(lowerCaseQuery) ||
              item.state.toLowerCase().includes(lowerCaseQuery)
            );
          default:
            return false;
        }
      });
      setFilteredData(filtered);
    }
  };

  React.useEffect(() => {
    setFilteredData(data || []); // Initialize filtered data with the original data or an empty array
  }, [data]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => {
    switch (category) {
      case "users":
        return (
          <View className="w-full gap-4">
            <View className="flex flex-row items-center justify-start p-4 mb-2 bg-white border rounded-2xl shadow-md">
              <View>
                <Avatar
                  alt={`${item.first_name}'s ${item.last_name} Avatar`}
                  className="w-14 h-14"
                >
                  <AvatarImage source={{ uri: item.avatar }} />
                  <AvatarFallback>
                    <Text>
                      {item.first_name[0]}
                      {item.last_name[0]}
                    </Text>
                  </AvatarFallback>
                </Avatar>
              </View>

              <View className="p-4 mb-2">
                <Text className="text-lg font-semibold">
                  {item.first_name} {item.last_name}
                </Text>
                <Text className="text-sm text-gray-500">
                  {item.employment.title}
                </Text>
                <Text className="text-sm text-gray-500">
                  Email: {item.email}
                </Text>
              </View>
            </View>
          </View>
        );
      case "appliances":
        return (
          <View className="p-4 mb-2 bg-white border rounded-2xl shadow-md">
            <Text className="text-lg font-semibold">{item.equipment}</Text>
            <Text className="text-sm text-gray-500">Brand: {item.brand}</Text>
            <Text className="text-sm text-gray-500">Price: ${item.price}</Text>
          </View>
        );
      case "beers":
        return (
          <View className="p-4 mb-2 bg-white border rounded-2xl shadow-md">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-sm text-gray-500">Style: {item.style}</Text>
            <Text className="text-sm text-gray-500">Price: ${item.price}</Text>
          </View>
        );
      case "addresses":
        return (
          <View className="p-4 mb-2 bg-white border rounded-2xl shadow-md">
            <Text className="text-lg font-semibold">{item.street_address}</Text>
            <Text className="text-sm text-gray-500">
              {item.city}, {item.state}
            </Text>
            <Text className="text-sm text-gray-500">Price: ${item.price}</Text>
          </View>
        );
      default:
        return (
          <View className="p-4 mb-2 bg-white border rounded-2xl shadow-md">
            <Text className="text-lg font-semibold">Unknown Category</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary/30">
      {/* Back Button and Search Bar */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity
          onPress={() => router.push("/")} // Navigate back to the home screen
          className="flex-row items-center"
        >
          <Image
            source={isDarkMode ? icons.leftwhite : icons.left}
            className={`w-10 h-10 ${isDarkMode ? "tint-white" : "tint-black"}`}
            alt="Back Icon"
          />
        </TouchableOpacity>
        <TextInput
          className={`flex-1 h-12 ml-4 px-4 rounded-xl border shadow-lg ${
            isDarkMode
              ? "bg-black text-white border-white"
              : "bg-white text-black border-black"
          }`}
          placeholder="Search items..."
          placeholderTextColor={isDarkMode ? "#A1A1AA" : "#6B7280"}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Title */}
      <Text
        className={`text-2xl p-4 font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Items in{" "}
        {category === "addresses"
          ? "Houses"
          : category === "beers"
          ? "Beverages"
          : category === "users"
          ? "People"
          : category}
      </Text>

      {/* No Match Found */}
      {filteredData.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            No match found. Put another search term.
          </Text>
        </View>
      )}

      {/* FlatList */}
      <FlatList
        data={paginatedData}
        keyExtractor={(item) =>
          item.id || item.uid || item.name || item.street_address
        } // Use a unique key
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Pagination Controls */}
      {filteredData.length > itemsPerPage && (
        <View className="flex-row justify-center items-center p-4 bg-secondary/30">
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-400"
                : isDarkMode
                ? "bg-white"
                : "bg-black"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                currentPage === 1
                  ? "text-gray-600"
                  : isDarkMode
                  ? "text-black"
                  : "text-white"
              }`}
            >
              Previous
            </Text>
          </TouchableOpacity>
          <Text
            className={`mx-4 text-sm font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Page {currentPage} of {totalPages}
          </Text>
          <TouchableOpacity
            onPress={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-400"
                : isDarkMode
                ? "bg-white"
                : "bg-black"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                currentPage === totalPages
                  ? "text-gray-600"
                  : isDarkMode
                  ? "text-black"
                  : "text-white"
              }`}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

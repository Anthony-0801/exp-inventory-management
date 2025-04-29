import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { icons } from "~/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InventoriesListing() {
  const { results } = useLocalSearchParams(); // Get the filtered results from the URL
  const router = useRouter();
  const colorScheme = useColorScheme(); // Detect light or dark mode
  const isDarkMode = colorScheme === "dark";

  const data = results ? JSON.parse(results as string) : [];

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get paginated data for the current page
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderItem = ({ item }: { item: any }) => (
    <View className="p-4 mb-2 bg-white border rounded-2xl shadow-md">
      <Text className="text-lg font-semibold">
        {item.name ||
          item.equipment ||
          item.street_address ||
          `${item.first_name} ${item.last_name}`}
      </Text>
      <Text className="text-sm text-gray-500">
        {item.email ||
          item.brand ||
          item.style ||
          `${item.city}, ${item.state}`}
      </Text>
    </View>
  );

  return (
    <>
      <SafeAreaView className="flex-1 bg-secondary/30">
        {/* Back Button */}
        <View className="flex-row items-center p-4">
          <TouchableOpacity
            onPress={() => router.push("/")}
            className="flex-row items-center"
          >
            <Image
              source={isDarkMode ? icons.leftwhite : icons.left}
              className={`w-10 h-10 ${
                isDarkMode ? "tint-white" : "tint-black"
              }`}
              alt="Back Icon"
            />
          </TouchableOpacity>
          <Text
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Back to Home
          </Text>
        </View>

        {/* No Match Found */}
        {data.length === 0 ? (
          <View className="flex-1 justify-center items-start mt-2 p-4 bg-secondary/30">
            <Text
              className={`text-lg text-justify font-semibold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              No match was found. Go back and change your query to search among
              different categories.
            </Text>
          </View>
        ) : (
          <>
            {/* FlatList */}
            <FlatList
              data={paginatedData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />

            {/* Pagination Controls */}
            {data.length > itemsPerPage && (
              <View className="flex-row justify-center items-center p-4 bg-secondary/30">
                <TouchableOpacity
                  onPress={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
          </>
        )}
      </SafeAreaView>
    </>
  );
}

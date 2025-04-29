import React, { useState } from "react";
import { View, Text, TextInput, Alert, useColorScheme } from "react-native";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { setRecordsPerPages } from "~/services/api";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const [recordsPerPage, setRecordsPerPage] = useState<string>("10");
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme(); // Detect light or dark mode
  const isDarkMode = colorScheme === "dark";

  const validateInput = (value: string) => {
    const numberValue = Number(value);

    if (value.trim() === "") {
      setError("Input cannot be left blank.");
      return false;
    }

    if (isNaN(numberValue) || numberValue <= 0) {
      setError("Please enter a valid positive number.");
      return false;
    }

    if (!Number.isInteger(numberValue)) {
      setError("Value must be an integer.");
      return false;
    }

    if (numberValue == 1) {
      setError("Value cannot be 1.");
      return false;
    }

    if (numberValue > 100) {
      setError("Value cannot exceed 100.");
      return false;
    }

    setError(null); // Clear any previous errors
    return true;
  };

  const handleSave = () => {
    if (validateInput(recordsPerPage)) {
      const numberValue = Number(recordsPerPage);
      setRecordsPerPages(numberValue); // Save the value to the API
      Alert.alert("Success", `Records per page set to ${recordsPerPage}`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary/30 justify-center items-center gap-5 p-6">
      <Card className="w-full max-w-sm p-6 border-black bg-secondary/30 rounded-2xl shadow-md shadow-foreground/5">
        <Label className="text-base font-bold">Records per page</Label>
        <TextInput
          className={`w-full max-w-sm p-2 mt-2 rounded-2xl border shadow-md shadow-foreground/5 ${
            isDarkMode ? "bg-black text-white border-white" : "bg-white text-black border-black"
          }`}
          placeholder="Enter a value"
          placeholderTextColor={isDarkMode ? "#A1A1AA" : "#6B7280"} // Adjust placeholder color for themes
          keyboardType="numeric"
          value={recordsPerPage}
          onChangeText={(text) => {
            setRecordsPerPage(text);
            validateInput(text); // Validate input on change
          }}
        />
        {error && <Text className="text-red-500 text-sm mt-2">{error}</Text>}
        <Button
          className="mt-4 w-full max-w-sm bg-sky-600 rounded-2xl shadow-md shadow-foreground/5"
          onPress={handleSave}
        >
          <Text className="text-white font-bold">Save Settings</Text>
        </Button>
      </Card>
    </SafeAreaView>
  );
};

export default Settings;

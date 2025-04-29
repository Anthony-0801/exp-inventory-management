# Inventory Management App

This is an inventory management application built with React Native and Expo. The app allows users to browse categories, view inventory items, and manage settings such as the number of records displayed per page.

## Features

- **Dynamic Categories**: Browse categories like Houses, Beverages, Appliances, and People.
- **Inventory Listing**: View items in each category with dynamic data fetched from an API.
- **Settings Management**: Configure the number of records displayed per page with validation.
- **Dark and Light Mode**: Supports both themes with seamless switching.
- **Reusable Components**: Includes reusable UI components like Cards, Buttons, and Inputs.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/inventory-management.git
   ```
2. Navigate to the project directory:
   ```bash
   cd exp-inventory-management
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development
   ```bash
   npm run dev
   ```

## Folder Structure

```
├── app
│   ├── (tabs)
│   │   ├── [index.tsx]            # Home screen with category cards
│   │   ├── [settings.tsx]         # Setting for records per page
│   │   ├── [profile.tsx]          # Profile screen
│   ├── inventories
│   │   ├── inventory-listing.tsx  # Inventory listing screen
├── components
│   ├── ui                         # Reusable UI components
├── services
│   ├── [api.ts]                   # API function for fetching data
│   ├── [useFetch.ts]              # Custom hook for fetching data
├── constants
│   ├── images.ts                  # Image assets
│   ├── icons.ts                   # Icon assets
├── lib
│   ├── useColorScheme.ts          # Hook for light/dark mode
├── [README.md]                    # Project Documentation
```

## API Integration

The app uses the Random Data API to fetch dynamic data for categories like users, appliances, beers, and addresses.

#### API Endpoints

- Users: https://random-data-api.com/api/v2/users
- Appliances: https://random-data-api.com/api/v2/appliances
- Beers: https://random-data-api.com/api/v2/beers
- Addresses: https://random-data-api.com/api/v2/addresses

## How to Use?
1. Browse Categories:
   - Navigate to the home screen to view category cards.  
   - Click on a card to view the inventory items in that category.  

2. View Inventory:
   - The inventory listing screen displays items dynamically fetched from the API based on the selected category.

3. Configure Settings:
   - Go to the Settings screen to set the number of records displayed per page.  
   - Input validation ensures the value is valid before saving.  

4. Dark/Light Mode:
   - Toggle between dark and light modes using your device theme.  

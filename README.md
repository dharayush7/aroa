# AROA - Social Media Video Sharing App

## Overview

**AROA** is a mobile application that functions as a social media platform, allowing users to upload, share, and browse videos. Users can create an account, log in, upload videos with associated thumbnails, titles, and descriptions, and also explore videos uploaded by others. The app includes a user profile page where users can track the number of posts they've made. Additionally, there is a search feature to help users discover videos more easily.

The app is built using the **Expo framework** for cross-platform mobile development and utilizes **Appwrite** as the backend-as-a-service (BaaS) for authentication, database management, file storage, and more.

## Features

- **User Authentication**: Users can log in and sign up with email and password.
- **Video Upload**: Upload videos with thumbnails, titles, and descriptions.
- **Browse Videos**: Explore and view videos uploaded by other users.
- **User Profile**: View the user’s profile, including the number of posts they have made.
- **Search Functionality**: Search for videos or users by keywords.
- **Responsive UI**: Optimized for both Android and iOS devices.

## Tech Stack

- **Frontend**:
  - **Expo Framework**: A React Native framework to build cross-platform apps for iOS and Android.
  - **React Native**: A JavaScript framework for building native mobile applications.
  
- **Backend**:
  - **Appwrite**: A backend-as-a-service (BaaS) for authentication, file storage, and database management.

## Project Structure

```plaintext
AROA/
├── app/                       # Main app directory
│   ├── apps/                  # Apps folder containing different application views
│   │   ├── (auth)/            # Authentication-related components and screens
│   │   ├── (tabs)/            # Tab navigation (Home, Profile, Upload)
│   │   ├── index.tsx          # Entry point for the app
│   │   └── _layout.tsx        # Layout component with global navigation setup
│   ├── components/            # Reusable UI components
│   │   ├── CustomButton.tsx   # Custom button component
│   │   ├── Empty.tsx          # Empty state component
│   │   ├── InfoBox.tsx        # Info box for displaying alerts or messages
│   │   ├── SearchInput.tsx    # Search input field component
│   │   ├── VideoCard.tsx      # Displays video thumbnail, title, and description
│   │   ├── DialogBoxWithOption.tsx # Custom dialog box with options
│   │   ├── FormField.tsx      # Reusable form field for inputs
│   │   ├── LoadingDialog.tsx  # Loading dialog shown during data fetch
│   │   ├── Trending.tsx       # Displays a list of trending videos
│   │   ├── Video.tsx          # Video player component
│   ├── contexts/              # Global state management using React context
│   │   ├── GlobalProvider.tsx # Global provider to manage app-wide state
│   ├── lib/                   # Utility functions and services
│   ├── constants/             # App constants 
│   └── assets/                # Static assets like images, icons, and videos
│                     
├── README.md              # Project overview and setup instructions
└── .env                # Environment variables (Appwrite configurations)
```

### Folder Descriptions

- **app/**: Contains the main app files, including the entry point (`index.tsx`), layout (`_layout.tsx`), and views/components organized under tabs.
- **components/**: Reusable UI components such as buttons, cards, search inputs, and video players.
- **contexts/**: Contains context providers like `GlobalProvider.tsx` to manage global state (user authentication, app data).
- **lib/**: Utility functions to interact with the Appwrite API (authentication, file upload, video fetch).
- **constants/**: Constants for the app, including color schemes, string labels, and Appwrite configuration values.
- **assets/**: Stores images, icons, and other media files used throughout the app.
- **.env**: Contains environment variables needed to configure the app, such as Appwrite credentials.

### Key Components

- **CustomButton.tsx**: A reusable button component used throughout the app.
- **Empty.tsx**: Displays when there is no content available (e.g., no videos uploaded).
- **InfoBox.tsx**: A component to display alerts or information boxes with messages.
- **SearchInput.tsx**: Input field for searching videos or users.
- **VideoCard.tsx**: Card displaying a video's thumbnail, title, and description, used in feeds and search results.
- **DialogBoxWithOption.tsx**: A dialog box with customizable options, typically used for confirming actions.
- **FormField.tsx**: A reusable form field component for handling user input.
- **LoadingDialog.tsx**: A loading indicator shown when data is being fetched from the backend.
- **Trending.tsx**: Displays a list of trending videos based on likes or views.
- **Video.tsx**: A custom video player component to play videos.

## Installation

### Prerequisites

1. **Node.js**: Make sure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. **Expo CLI**: If you don't have Expo CLI installed, you can install it globally using npm:
   ```bash
   npm install -g expo-cli
   ```
3. **Appwrite Account**: You need to set up an Appwrite instance. Refer to the [Appwrite Documentation](https://appwrite.io/docs) to get started.

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dharayush7/aroa
   cd aroa
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Appwrite**:
   - Sign up for an account on [Appwrite](https://appwrite.io/).
   - Create a new project and enable authentication via email/password.
   - Set up a **storage bucket** for video and thumbnail uploads.
   - Set up **collections** in Appwrite’s database for storing video metadata (e.g., title, description).
   - Update the `.env` file with your Appwrite configuration:
   - Appwrite configuration details shared on [configurations.md](https://github.com/dharayush7/aroa/blob/main/configuration.md)

   ```plaintext
   EXPO_PUBLIC_ENDPOINT=https://[YOUR_APPWRITE_ENDPOINT]
   EXPO_PUBLIC_PLATFORM=com.ayushdhar.aora
   EXPO_PUBLIC_PROJECT_ID=[YOUR_PROJECT_ID]
   EXPO_PUBLIC_DATABASE_ID=[YOUR_DATABASE_ID]
   EXPO_PUBLIC_USER_COLLECTION_ID=[USER_COLLECTION_ID]
   EXPO_PUBLIC_VIDEO_COLLECTION_ID=[VIDEO_COLLECTION_ID]
   EXPO_PUBLIC_STORAGE_ID=[STORAGE_BUCKET_ID]
   ```

4. **Run the App**:
   - For iOS:
     ```bash
     expo start --ios
     ```
   - For Android:
     ```bash
     expo start --android
     ```

### Build for Production

To create a production build for Android or iOS, use Expo’s build tools:

- **Build for Android**:
  ```bash
  expo build:android
  ```

- **Build for iOS**:
  ```bash
  expo build:ios
  ```

## Features & How to Use

### 1. **Sign Up / Log In**:
   - Upon launching the app, users can sign up or log in using their email and password.

### 2. **Upload Videos**:
   - After logging in, users can upload videos, along with a title, description, and thumbnail.

### 3. **Browse Videos**:
   - On the home screen, users can browse through a feed of videos uploaded by others. Each video displays a thumbnail, title, and description.

### 4. **Profile Page**:
   - Users can access their profile page to view their information, including how many posts they have made.

### 5. **Search**:
   - Users can search for videos or users using the search input in the app. Search results are displayed in real-time as users type.

### 6. **Trending Videos**:
   - The "Trending" section highlights popular videos based on engagement.

## Dowload App
   Hare is a [link](https://drive.google.com/file/d/1wdyKDr98tnd9-lYI9o3HUeECBabLZJr7/view?usp=sharing) to download .apk file. Install and use.

## Contributing

We welcome contributions! Here’s how you can contribute to **AROA**:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request and describe your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/dharayush7/aroa/blob/main/LICENSE) file for details.

## Acknowledgements

- **Expo**: For making it easy to build cross-platform apps.
- **Appwrite**: For providing an excellent backend-as-a-service platform.

## Contact

For more information or support, feel free to reach out via [contact@ayushdhar.com].

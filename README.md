# 📝 Notes App

A simple and secure Notes application built with **React Native** and **Supabase**. This app allows users to create, view, edit and delete their personal notes with email/password authentication.

## 🚀 Features

- **User Authentication**: Sign up and login with email and password
- **Secure Notes Management**: Create, read, update, and delete personal notes
- **Offline Detection**: Displays offline UI when no internet connection is available
- **Row Level Security**: Each user can only access their own notes
- **Session Persistence**: User sessions persist across app restarts
- **Cross-Platform**: Runs on both Android and iOS
- **Clean UI**: Simple and intuitive user interface

## 🛠 Tech Stack

- **React Native** (v0.80.0)
- **Supabase** (Authentication + PostgreSQL Database)
- **@react-native-community/netinfo** (Network connectivity detection)
- **AsyncStorage** (Session persistence)
- **JavaScript**

## 📋 Prerequisites

Before running this app, make sure you have:

- **Node.js** (>= 18)
- **React Native development environment** set up
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

For detailed setup instructions, visit the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment).

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
# Install npm dependencies
npm install
```

### 2. Install iOS Dependencies (macOS only)

If you're developing for iOS, install CocoaPods dependencies:

```bash
# Install CocoaPods (first time setup)
bundle install

# Install iOS dependencies
bundle exec pod install
```

### 3. Start Metro Server

```bash
npm start
```

### 4. Run the App

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

## 📂 Project Structure

```
NotesApp/
├── src/
│   ├── AuthScreen.js      # Authentication screen (login/signup)
│   ├── NotesScreen.js     # Main notes screen (CRUD operations)
│   └── supabase.js        # Supabase client configuration
├── __tests__/
│   └── App.test.tsx       # Test file
├── android/               # Android native code
├── ios/                   # iOS native code
├── App.js                 # Main app component
├── index.js               # App entry point
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🔧 Configuration

The app is pre-configured with Supabase. The Supabase client is initialized in `src/supabase.js` with:

- **Supabase URL**: `https://mbksnphunvjiscuiaqbw.supabase.co`
- **Anon Key**: Configured for authentication

For production use, consider moving these to environment variables.

## 🗄 Database Schema

The app uses a simple `notes` table in Supabase with the following structure:

- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `title` (text)
- `content` (text)
- `created_at` (timestamp)

Row Level Security (RLS) is enabled to ensure users can only access their own notes.

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📱 Usage

1. **Sign Up**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Add Notes**: Tap the "+" button to create new notes
4. **Edit Notes**: Tap on any note to edit its title and content
5. **View Notes**: All your notes are displayed in a scrollable list
6. **Delete Notes**: Swipe or tap delete on any note to remove it
7. **Offline Mode**: When offline, the app displays a connection status screen
8. **Logout**: Access logout option from the notes screen

### 🔐 Sample Login Credentials

For testing purposes, you can create accounts using these sample formats:

**Email Format**: `testuser@example.com` or `yourname@test.com`
**Password Requirements**:
- Minimum 6 characters
- Can include letters, numbers, and special characters

**Example Accounts** (create these during signup):
- Email: `samplename@example.com`
- Password: `password123`

- Email: `samplename@example.com`
- Password: `password123`

**Note**: These are just examples. In a real application, use strong, unique passwords and never share credentials.

## 🔒 Security Features

- **Authentication**: Email/password authentication via Supabase Auth
- **Session Management**: Automatic token refresh and session persistence
- **Data Security**: Row Level Security ensures data isolation
- **Secure Storage**: Uses AsyncStorage for local session storage

## 🐛 Troubleshooting

### Common Issues

- **Metro server not starting**: Ensure no other processes are using port 8081
- **Android build fails**: Check Android SDK and emulator setup
- **iOS build fails**: Ensure CocoaPods is installed and run `bundle exec pod install`
- **Supabase connection issues**: Verify internet connection and Supabase service status
- **Offline mode stuck**: Check network connectivity and restart the app

### Debug Mode

- **Android**: Shake device or press <kbd>Ctrl</kbd> + <kbd>M</kbd> to open dev menu
- **iOS**: Shake device or press <kbd>Cmd</kbd> + <kbd>D</kbd> in simulator

## 📚 Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Supabase Documentation](https://supabase.com/docs)
- [React Native AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.



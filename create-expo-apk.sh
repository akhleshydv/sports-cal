#!/bin/bash

echo "🏆 Sports Tournament Calendar - APK Builder"
echo "=========================================="

echo ""
echo "🎯 Creating Expo version for APK generation..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the sport-cal directory"
    exit 1
fi

# Create Expo app
echo "📱 Creating Expo app..."
cd ..
npx create-expo-app SportCalExpo --template blank-typescript

if [ $? -eq 0 ]; then
    echo "✅ Expo app created successfully!"
    
    # Navigate to new app
    cd SportCalExpo
    
    # Install dependencies
    echo "📦 Installing dependencies..."
    npm install react-native-calendars moment axios
    
    # Copy our source code
    echo "📋 Copying your perfect tournament calendar code..."
    cp -r ../sport-cal/src ./
    cp ../sport-cal/App.tsx ./
    
    # Update package.json name
    sed -i '' 's/"name": "SportCalExpo"/"name": "Sports Tournament Calendar"/' package.json
    
    echo ""
    echo "🎉 SUCCESS! Your Expo app is ready!"
    echo ""
    echo "📱 Next steps to build APK:"
    echo "1. cd SportCalExpo"
    echo "2. npx expo login (create free account)"
    echo "3. npx expo build:android"
    echo ""
    echo "⚡ Or run immediately:"
    echo "cd SportCalExpo && expo start"
    echo ""
    echo "📱 Your app will work on:"
    echo "✅ Web browser"
    echo "✅ iOS (with Expo Go app)"
    echo "✅ Android (with Expo Go app)"
    echo "✅ APK build for distribution"
    
else
    echo "❌ Error creating Expo app. Please try manually:"
    echo "npx create-expo-app SportCalExpo --template blank-typescript"
fi
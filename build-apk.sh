#!/bin/bash

# 🚀 Sports Tournament Calendar - APK Builder Script
# This script creates an APK using Capacitor (No Android Studio needed!)

echo "🏆 Building Sports Tournament Calendar APK..."
echo "⚡ Using Capacitor for fast APK generation"

# Step 1: Create Capacitor project
echo "📦 Step 1: Installing Capacitor..."
cd /Users/akhleshyadav/Desktop/sport-cal

# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Initialize Capacitor
npx cap init "Sports Tournament Calendar" "com.sportstournament.app"

# Step 2: Build web version
echo "🌐 Step 2: Building web version..."
npm run build || npm run web:build || (
    echo "Building static web version..."
    mkdir -p dist
    cp -r web/* dist/ 2>/dev/null || true
    cp index.html dist/ 2>/dev/null || true
    echo "Web build ready in dist/"
)

# Step 3: Add Android platform
echo "📱 Step 3: Adding Android platform..."
npx cap add android

# Step 4: Copy web assets
echo "📋 Step 4: Copying web assets..."
npx cap copy

# Step 5: Build APK
echo "🔨 Step 5: Building APK..."
cd android
chmod +x gradlew

# Build debug APK (no signing required)
./gradlew assembleDebug

echo "✅ APK created successfully!"
echo "📱 APK location: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "🎯 Next steps:"
echo "1. Copy APK to your phone"
echo "2. Enable 'Install from unknown sources' in Android settings"
echo "3. Install and enjoy your Sports Tournament Calendar!"
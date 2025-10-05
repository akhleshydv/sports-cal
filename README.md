# 🏆 Sports Tournament Calendar - React Native App

video link: https://drive.google.com/file/d/1NvJ7VY7K8KMbbl9qYAShUCf1Od7cbS-u/view?usp=sharing

A beautiful React Native application that displays sports tournaments in an interactive calendar and card view format. Built with TypeScript and Expo for easy deployment.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)

## ✨ Features

🏅 **Sports Filter Dropdown**
- Filter tournaments by Cricket, Football, Basketball
- Smooth dropdown animations
- Real-time tournament filtering

📅 **Interactive Calendar**
- Month view highlighting tournament start dates
- Tap highlighted dates to view tournaments for that day
- Beautiful material design calendar

🎯 **Tournament Cards**
- Expandable match details with venue and timing
- Tournament-specific emoji icons (🏆🥇⚽🏏)
- Clean, modern card design with IST time formatting

🕒 **Time Handling**
- All times displayed in IST
- Smart date formatting and parsing

## API Integration

### Sports List
```
GET https://stapubox.com/sportslist
```

### Tournament Data
```
GET https://stapubox.com/tournament/demo
```

### Filtered Data
```
GET https://stapubox.com/tournament/demo?sports_id=7061509&month=8
```

## Quick Start

### Prerequisites
- Node.js (>= 18)
- React Native development environment
- Android Studio / Xcode

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **iOS setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Start Metro bundler**
   ```bash
   npm start
   ```

4. **Run on device**
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   ```

### Additional Setup for Icons

For react-native-vector-icons to work properly:

**Android:**
Add to `android/app/build.gradle`:
```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

**iOS:**
Follow the manual linking instructions for react-native-vector-icons in your Info.plist.

## Project Structure

```
src/
├── components/
│   ├── SportsFilter.tsx       # Sports dropdown filter
│   ├── TournamentCalendar.tsx  # Calendar component
│   └── TournamentCard.tsx      # Tournament and match cards
├── screens/
│   └── TournamentScreen.tsx    # Main screen
├── services/
│   └── apiService.ts          # API integration
├── types/
│   └── index.ts               # TypeScript interfaces
└── utils/
    └── dateUtils.ts           # Date/time utilities
```

## Key Components

### SportsFilter
- Dropdown picker for sport selection
- Handles "All Sports" option
- Triggers data refresh on selection

### TournamentCalendar
- Calendar with marked tournament dates
- Month navigation (Aug-Oct 2025)
- Date selection functionality

### TournamentCard
- Expandable tournament cards
- Match details with status indicators
- Smooth animations

## Data Flow

1. **Initial Load**: Fetch sports list and tournaments
2. **Sport Selection**: Filter tournaments by selected sport
3. **Date Selection**: Filter tournaments by selected date
4. **Card Expansion**: Show/hide tournament matches

## Styling

- Material Design inspired
- Clean, modern interface
- Responsive layout
- Smooth animations and transitions

## Development Notes

- Uses TypeScript for type safety
- Modular component architecture
- Error handling and loading states
- Offline-first with demo data fallback

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this code for your projects!

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Alert,
} from 'react-native';
import SportsFilter from '../components/SportsFilter';
import TournamentCalendar from '../components/TournamentCalendar';
import TournamentCard from '../components/TournamentCard';
import ApiService from '../services/apiService';
import {Sport, Tournament, SportData} from '../types';
import {isSameDay} from '../utils/dateUtils';

const TournamentScreen: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [allTournaments, setAllTournaments] = useState<SportData[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    filterTournaments();
  }, [selectedSport, allTournaments, selectedDate]);

  const loadInitialData = async () => {
    try {
      await Promise.all([loadSports(), loadTournaments()]);
    } catch (error) {
      console.error('Error loading initial data:', error);
      Alert.alert('Error', 'Failed to load data. Please try again.');
    }
  };

  const loadSports = async () => {
    try {
      const sportsData = await ApiService.getSportsList();
      setSports(sportsData);
    } catch (error) {
      console.error('Error loading sports:', error);
    }
  };

  const loadTournaments = async () => {
    try {
      const response = await ApiService.getTournaments();
      if (response.status === 'success') {
        setAllTournaments(response.data);
      }
    } catch (error) {
      console.error('Error loading tournaments:', error);
    }
  };

  const filterTournaments = () => {
    let tournaments: Tournament[] = [];

    if (selectedSport === 'all') {
      tournaments = allTournaments.flatMap(sportData => sportData.tournaments);
    } else {
      const sportData = allTournaments.find(
        sport => sport.sports_id.toString() === selectedSport
      );
      tournaments = sportData ? sportData.tournaments : [];
    }

    // Filter by selected date if any
    if (selectedDate) {
      tournaments = tournaments.filter(tournament =>
        isSameDay(tournament.start_date, selectedDate)
      );
    }

    setFilteredTournaments(tournaments);
  };

  const handleSportChange = async (sportId: string) => {
    setSelectedSport(sportId);
    setSelectedDate(''); // Reset date filter when sport changes
    
    // Load sport-specific data if needed
    if (sportId !== 'all') {
      try {
        const response = await ApiService.getTournaments(sportId);
        if (response.status === 'success') {
          // Update tournaments for this specific sport
          setAllTournaments(prevData => {
            const filtered = prevData.filter(
              sport => sport.sports_id.toString() !== sportId
            );
            return [...filtered, ...response.data];
          });
        }
      } catch (error) {
        console.error('Error loading sport-specific tournaments:', error);
      }
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(selectedDate === date ? '' : date);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadInitialData();
    setRefreshing(false);
  };

  const getDisplayTitle = () => {
    if (selectedDate) {
      const selectedSportName = sports.find(sport => sport.id === selectedSport)?.name || 'All Sports';
      return `${selectedSportName} - ${selectedDate}`;
    }
    return selectedSport === 'all' ? 'All Tournaments' : 
           sports.find(sport => sport.id === selectedSport)?.name || 'Tournaments';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sports Tournament Calendar</Text>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <SportsFilter
          sports={sports}
          selectedSport={selectedSport}
          onSportChange={handleSportChange}
        />

        <TournamentCalendar
          tournaments={selectedSport === 'all' 
            ? allTournaments.flatMap(sportData => sportData.tournaments)
            : allTournaments.find(sport => sport.sports_id.toString() === selectedSport)?.tournaments || []}
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{getDisplayTitle()}</Text>
          <Text style={styles.tournamentCount}>
            {filteredTournaments.length} tournament{filteredTournaments.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {filteredTournaments.length > 0 ? (
          filteredTournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {selectedDate 
                ? 'No tournaments on this date' 
                : 'No tournaments found'}
            </Text>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  tournamentCount: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 20,
  },
});

export default TournamentScreen;
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Tournament, Match} from '../types';
import {formatTimeToIST, getDateRange} from '../utils/dateUtils';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({match}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return '#FF5722';
      case 'completed':
        return '#4CAF50';
      default:
        return '#2196F3';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live':
        return 'LIVE';
      case 'completed':
        return 'COMPLETED';
      default:
        return 'UPCOMING';
    }
  };

  return (
    <View style={styles.matchCard}>
      <View style={styles.matchHeader}>
        <Text style={styles.stage}>{match.stage}</Text>
        <View style={[styles.statusBadge, {backgroundColor: getStatusColor(match.status)}]}>
          <Text style={styles.statusText}>{getStatusText(match.status)}</Text>
        </View>
      </View>
      
      <View style={styles.teamsContainer}>
        <Text style={styles.teamName}>{match.team_a}</Text>
        <Text style={styles.vs}>VS</Text>
        <Text style={styles.teamName}>{match.team_b}</Text>
      </View>
      
      <View style={styles.matchInfo}>
        <View style={styles.infoItem}>
          <Icon name="schedule" size={16} color="#666" />
          <Text style={styles.infoText}>{formatTimeToIST(match.start_time)}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="location-on" size={16} color="#666" />
          <Text style={styles.infoText}>{match.venue}</Text>
        </View>
      </View>
    </View>
  );
};

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({tournament}) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const getIconForTournament = (tournamentName: string): string => {
    if (tournamentName.includes('BWF')) return '🏆';
    if (tournamentName.includes('Thomas')) return '🥇';
    if (tournamentName.includes('Durand')) return '🏆';
    if (tournamentName.includes('I-League')) return '⚽';
    if (tournamentName.includes('Ranji')) return '🏏';
    return '🏆';
  };

  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const hasMatches = tournament.matches && tournament.matches.length > 0;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={hasMatches ? toggleExpanded : undefined}
        activeOpacity={hasMatches ? 0.7 : 1}
      >
        <View style={styles.tournamentInfo}>
          <View style={styles.iconContainer}>
            <Text style={styles.tournamentIcon}>
              {getIconForTournament(tournament.name)}
            </Text>
          </View>
          <View style={styles.tournamentDetails}>
            <Text style={styles.tournamentName}>{tournament.name}</Text>
            <Text style={styles.tournamentLevel}>{tournament.level.toUpperCase()}</Text>
            <Text style={styles.dateRange}>
              {getDateRange(tournament.start_date)}
            </Text>
          </View>
        </View>
        
        {hasMatches && (
          <View style={styles.expandIcon}>
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
              }}
            >
              <Icon name="keyboard-arrow-down" size={24} color="#666" />
            </Animated.View>
          </View>
        )}
      </TouchableOpacity>

      {hasMatches && (
        <Animated.View
          style={[
            styles.matchesContainer,
            {
              maxHeight: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1000],
              }),
              opacity: animation,
            },
          ]}
        >
          {tournament.matches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  tournamentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tournamentImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  tournamentDetails: {
    flex: 1,
  },
  tournamentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tournamentLevel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2196F3',
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
  },
  expandIcon: {
    padding: 4,
  },
  matchesContainer: {
    overflow: 'hidden',
  },
  matchCard: {
    backgroundColor: '#f8f9fa',
    margin: 12,
    marginTop: 0,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  vs: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginHorizontal: 16,
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    marginRight: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tournamentIcon: {
    fontSize: 48,
    textAlign: 'center',
    lineHeight: 60,
  },
});

export default TournamentCard;
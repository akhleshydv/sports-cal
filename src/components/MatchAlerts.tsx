import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Tournament, Match } from '../types';
import { formatTimeToIST, isToday, isTomorrow } from '../utils/dateUtils';

interface MatchAlertsProps {
  tournaments: Tournament[];
}

interface AlertMatch {
  match: Match;
  tournament: string;
  sport: string;
  timeUntil: string;
}

export const MatchAlerts: React.FC<MatchAlertsProps> = ({ tournaments }) => {
  const [alerts, setAlerts] = useState<AlertMatch[]>([]);
  const [showAlerts, setShowAlerts] = useState(true);

  useEffect(() => {
    const upcomingMatches: AlertMatch[] = [];
    const now = new Date();
    
    tournaments.forEach(tournament => {
      tournament.matches.forEach(match => {
        const matchDate = new Date(match.start_date);
        const timeDiff = matchDate.getTime() - now.getTime();
        const hoursUntil = timeDiff / (1000 * 3600);
        
        // Show alerts for matches within next 24 hours
        if (hoursUntil > 0 && hoursUntil <= 24) {
          let timeUntil = '';
          if (hoursUntil < 1) {
            const minutesUntil = Math.floor(timeDiff / (1000 * 60));
            timeUntil = `${minutesUntil} minutes`;
          } else {
            timeUntil = `${Math.floor(hoursUntil)} hours`;
          }
          
          upcomingMatches.push({
            match,
            tournament: tournament.name,
            sport: 'Sport', // We'll get this from context
            timeUntil
          });
        }
      });
    });
    
    // Sort by time until match
    upcomingMatches.sort((a, b) => 
      new Date(a.match.start_date).getTime() - new Date(b.match.start_date).getTime()
    );
    
    setAlerts(upcomingMatches.slice(0, 3)); // Show max 3 alerts
  }, [tournaments]);

  if (!showAlerts || alerts.length === 0) {
    return null;
  }

  return (
    <View style={styles.alertContainer}>
      <View style={styles.alertHeader}>
        <View style={styles.headerLeft}>
          <Icon name="schedule" size={20} color="#FF5722" />
          <Text style={styles.alertTitle}>Upcoming Matches</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setShowAlerts(false)}
          style={styles.closeButton}
        >
          <Icon name="close" size={18} color="#666" />
        </TouchableOpacity>
      </View>
      
      {alerts.map((alert, index) => (
        <View key={alert.match.id} style={styles.alertItem}>
          <View style={styles.alertDot} />
          <View style={styles.alertContent}>
            <Text style={styles.matchTitle}>
              {alert.match.team_a} vs {alert.match.team_b}
            </Text>
            <Text style={styles.matchDetails}>
              {alert.tournament} • {alert.match.stage}
            </Text>
            <Text style={styles.timeAlert}>
              Starts in {alert.timeUntil} • {formatTimeToIST(alert.match.start_date)}
            </Text>
          </View>
        </View>
      ))}
      
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View All Matches</Text>
        <Icon name="arrow-forward" size={16} color="#2196F3" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FFB74D',
    borderWidth: 1,
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E65100',
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
    marginTop: 6,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  matchTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  matchDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  timeAlert: {
    fontSize: 12,
    color: '#FF5722',
    fontWeight: '500',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#FFE0B2',
  },
  viewAllText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
    marginRight: 4,
  },
});
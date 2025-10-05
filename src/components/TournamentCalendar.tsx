import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {CalendarDay, MarkedDates, Tournament} from '../types';
import {formatDateForCalendar} from '../utils/dateUtils';

interface TournamentCalendarProps {
  tournaments: Tournament[];
  onDateSelect: (date: string) => void;
  selectedDate?: string;
}

const TournamentCalendar: React.FC<TournamentCalendarProps> = ({
  tournaments,
  onDateSelect,
  selectedDate,
}) => {
  const getMarkedDates = (): MarkedDates => {
    const marked: MarkedDates = {};

    // Mark tournament start dates
    tournaments.forEach(tournament => {
      const dateKey = formatDateForCalendar(tournament.start_date);
      marked[dateKey] = {
        marked: true,
        dotColor: '#4CAF50',
      };
    });

    // Highlight selected date
    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: '#2196F3',
      };
    }

    return marked;
  };

  const handleDayPress = (day: CalendarDay) => {
    onDateSelect(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        current="2025-08-01"
        minDate="2025-08-01"
        maxDate="2025-10-31"
        onDayPress={handleDayPress}
        monthFormat="MMMM yyyy"
        markedDates={getMarkedDates()}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#2196F3',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#2196F3',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#4CAF50',
          selectedDotColor: '#ffffff',
          arrowColor: '#2196F3',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: '#2d4150',
          indicatorColor: '#2196F3',
          textDayFontWeight: '500',
          textMonthFontWeight: '600',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  calendar: {
    borderRadius: 12,
    paddingVertical: 16,
  },
});

export default TournamentCalendar;
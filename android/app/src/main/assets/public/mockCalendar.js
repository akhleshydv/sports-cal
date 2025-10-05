import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Mock Calendar component for web
export const Calendar = ({
  current,
  minDate,
  maxDate,
  onDayPress,
  monthFormat,
  markedDates = {},
  theme = {},
  style,
  ...props
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(current || new Date()));

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        day,
        dateString,
        month: month + 1,
        year,
        timestamp: new Date(year, month, day).getTime(),
      });
    }

    return days;
  };

  const days = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  return (
    <View style={{
      backgroundColor: theme.backgroundColor || '#ffffff',
      padding: 16,
      borderRadius: 12,
      ...style,
    }}>
      {/* Month Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <TouchableOpacity onPress={() => navigateMonth(-1)}>
          <Text style={{ fontSize: 18, color: theme.arrowColor || '#2196F3' }}>‹</Text>
        </TouchableOpacity>
        <Text style={{
          fontSize: theme.textMonthFontSize || 18,
          fontWeight: theme.textMonthFontWeight || '600',
          color: theme.monthTextColor || '#2d4150',
        }}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <TouchableOpacity onPress={() => navigateMonth(1)}>
          <Text style={{ fontSize: 18, color: theme.arrowColor || '#2196F3' }}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Day Headers */}
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
          <View key={dayName} style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{
              fontSize: theme.textDayHeaderFontSize || 14,
              fontWeight: theme.textDayHeaderFontWeight || '600',
              color: theme.textSectionTitleColor || '#b6c1cd',
            }}>
              {dayName}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {days.map((day, index) => {
          if (!day) {
            return <View key={index} style={{ width: '14.28%', height: 40 }} />;
          }

          const marked = markedDates[day.dateString];
          const isSelected = marked?.selected;
          const isMarked = marked?.marked;

          return (
            <TouchableOpacity
              key={day.dateString}
              style={{
                width: '14.28%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isSelected ? theme.selectedDayBackgroundColor || '#2196F3' : 'transparent',
                borderRadius: 20,
                margin: 1,
              }}
              onPress={() => onDayPress && onDayPress(day)}
            >
              <Text style={{
                fontSize: theme.textDayFontSize || 16,
                fontWeight: theme.textDayFontWeight || '500',
                color: isSelected 
                  ? theme.selectedDayTextColor || '#ffffff'
                  : theme.dayTextColor || '#2d4150',
              }}>
                {day.day}
              </Text>
              {isMarked && (
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: marked.dotColor || theme.dotColor || '#4CAF50',
                  position: 'absolute',
                  bottom: 4,
                }} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
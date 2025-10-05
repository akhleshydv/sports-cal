import React from 'react';
import {View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Sport} from '../types';

interface SportsFilterProps {
  sports: Sport[];
  selectedSport: string;
  onSportChange: (sportId: string) => void;
}

const SportsFilter: React.FC<SportsFilterProps> = ({
  sports,
  selectedSport,
  onSportChange,
}) => {
  const [open, setOpen] = React.useState(false);

  const items = [
    {label: 'All Sports', value: 'all'},
    ...sports.map(sport => ({
      label: sport.name,
      value: sport.id,
    })),
  ];

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={selectedSport}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const value = typeof callback === 'function' ? callback(selectedSport) : callback;
          onSportChange(value);
        }}
        placeholder="Select Sport"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.text}
        placeholderStyle={styles.placeholder}
        arrowIconStyle={styles.arrow}
        tickIconStyle={styles.tick}
        zIndex={3000}
        zIndexInverse={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    zIndex: 3000,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 50,
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  text: {
    fontSize: 16,
    color: '#333333',
  },
  placeholder: {
    fontSize: 16,
    color: '#999999',
  },
  arrow: {
    width: 20,
    height: 20,
  },
  tick: {
    width: 20,
    height: 20,
  },
});

export default SportsFilter;
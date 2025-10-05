import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const DropDownPicker = ({
  open,
  value,
  items,
  setOpen,
  setValue,
  placeholder,
  style,
  dropDownContainerStyle,
  textStyle,
  placeholderStyle,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open);

  const handlePress = () => {
    setIsOpen(!isOpen);
    setOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setValue(item.value);
    setIsOpen(false);
    setOpen(false);
  };

  const selectedItem = items.find(item => item.value === value);

  return (
    <View style={{ position: 'relative', zIndex: isOpen ? 1000 : 1 }}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: '#ffffff',
          borderColor: '#e0e0e0',
          borderWidth: 1,
          borderRadius: 12,
          minHeight: 50,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...style,
        }}
      >
        <Text style={{
          fontSize: 16,
          color: selectedItem ? '#333333' : '#999999',
          ...textStyle,
          ...(selectedItem ? {} : placeholderStyle),
        }}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Text style={{ fontSize: 16, color: '#666' }}>
          {isOpen ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderColor: '#e0e0e0',
          borderWidth: 1,
          borderTopWidth: 0,
          borderRadius: 12,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          maxHeight: 200,
          zIndex: 1000,
          ...dropDownContainerStyle,
        }}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={{
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f0f0f0',
                }}
              >
                <Text style={{
                  fontSize: 16,
                  color: '#333333',
                  ...textStyle,
                }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default DropDownPicker;
import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import clsx from 'clsx';

interface SelectBoxProps {
  label: string;
  description?: string;
  isSelected?: boolean;
  onPress?: () => void;
  icon?: any; // Optional icon for the select box
}

const Icon = ({ focused, icon }: CustomIconProps) => {
  return (
    <View className="tabs-icon">
      <View className={clsx('tabs-pill', focused && 'tabs-active')}>
        <Image source={icon} resizeMode="contain" className="tabs-glyph" />
      </View>
    </View>
  );
};

export const SelectBox = ({
  label,
  description,
  isSelected: externalSelected,
  onPress,
  icon,
}: SelectBoxProps) => {
  const [internalSelected, setInternalSelected] = useState(false);

  // Supports both controlled (passed from parent) and uncontrolled internal state
  const isSelected = externalSelected !== undefined ? externalSelected : internalSelected;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setInternalSelected(!internalSelected);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
      className={clsx(
        `mb-3 w-full flex-row items-center justify-between rounded-xl border-2 p-4 transition-all`,
        isSelected
          ? 'border-primary bg-primary/10' // Active state: highlight border and light background fill
          : 'border-gray-200 bg-white' // Default state)
      )}>
      <View className="mr-3 flex-1">
        <Text
          className={`text-base font-semibold ${isSelected ? 'text-primary' : 'text-gray-800'}`}>
          {label}
        </Text>
        {description ? (
          <Text className="mt-1 text-xs text-gray-500" numberOfLines={1} ellipsizeMode="tail">
            {description}
          </Text>
        ) : null}
      </View>

      {/* Custom Checkbox Indicator */}
      <View>
        <Icon icon={icon} />
      </View>
    </TouchableOpacity>
  );
};

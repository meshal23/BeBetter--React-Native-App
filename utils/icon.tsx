import { View, Text, Image } from 'react-native';
import React from 'react';
import clsx from 'clsx';

export const Icon = ({ focused, icon }: CustomIconProps) => {
  return (
    <View className="tabs-icon">
      <View className={clsx('tabs-pill', focused && 'tabs-active')}>
        <Image source={icon} resizeMode="contain" className="tabs-glyph" />
      </View>
    </View>
  );
};

export default Icon;

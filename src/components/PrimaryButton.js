// src/components/PrimaryButton.js (example)
import React from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from '../constants/theme';


const PrimaryButton = ({ onPress, children, style, disabled, accessibilityLabel }) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPressIn={() => (scale.value = withSpring(0.95))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={onPress}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
        style={[styles.button, style, disabled && styles.disabled]}
      >
        {typeof children === 'string' ? (
          <Text style={styles.text}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: COLORS.disabled,
    opacity: 0.6,
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: SIZES.body,
  },
});

export default PrimaryButton;
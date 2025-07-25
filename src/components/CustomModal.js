import React, { useEffect } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Text } from 'react-native-paper';
import PrimaryButton from './PrimaryButton';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const CustomModal = ({ visible, onClose, title, message, buttonText, accessibilityLabel, accessibilityHint }) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      scale.value = withSpring(1, { damping: 15, stiffness: 100 });
      opacity.value = withSpring(1, { duration: 300 });
    } else {
      scale.value = withSpring(0.8);
      opacity.value = withSpring(0);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <Text style={styles.title} accessible accessibilityLabel={title}>
            {title}
          </Text>
          <Text style={styles.message} accessible accessibilityLabel={message}>
            {message}
          </Text>
          <PrimaryButton
            onPress={onClose}
            style={styles.button}
            accessibilityLabel={accessibilityLabel || "Close modal button"}
            accessibilityHint={accessibilityHint || "Press to close the modal"}
          >
            {buttonText}
          </PrimaryButton>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: SIZES.h3,
    marginBottom: SIZES.margin,
    textAlign: 'center',
  },
  message: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body,
    textAlign: 'center',
    marginBottom: SIZES.margin * 1.5,
  },
  button: {
    width: '100%',
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
  },
});

export default CustomModal;
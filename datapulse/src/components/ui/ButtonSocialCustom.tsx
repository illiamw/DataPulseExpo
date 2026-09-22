import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

interface ButtonCustomProps {
  title: string;
  onPress: () => void;
  image?: ImageSourcePropType;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function ButtonCustom({
  title = '',
  onPress,
  image,
  loading = false,
  disabled = false,
  style,
}: ButtonCustomProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !isDisabled && styles.buttonPressed,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <>
          {image && (
            <Image
              source={image}
              style={styles.image}
              resizeMode="contain"
            />
          )}

          <Text style={styles.text}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    width: '100%',
    backgroundColor: '#aec4f1',
    borderWidth: 1,
    borderColor: '#9eb6db',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },

  buttonPressed: {
    backgroundColor: '#1D4ED8',
  },

  buttonDisabled: {
    backgroundColor: '#334155',
    borderColor: '#475569',
    opacity: 0.7,
  },

  image: {
    width: 22,
    height: 22,
    marginRight: 10,
    marginLeft: 10,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

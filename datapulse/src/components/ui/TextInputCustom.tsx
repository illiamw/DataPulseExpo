import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface InputTextProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function InputText({
  label,
  error,
  ...props
}: InputTextProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        {...props}
        style={[
          styles.input,
          error && styles.inputError,
        ]}
        placeholderTextColor="#64748B"
      />

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },

  label: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    height: 52,
    width: '100%',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },

  inputError: {
    borderColor: '#EF4444',
  },

  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 5,
  },
});
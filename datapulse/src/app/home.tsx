import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Industrial() {
  const router = useRouter();

  const handleIndustrial = () => {
    router.push('/industrial');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Pressable
        style={styles.button}
        onPress={handleIndustrial}
      >
        <Text style={styles.buttonText}>
          Industrial
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 30,
  },

  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
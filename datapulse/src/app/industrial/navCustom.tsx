import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

type NavCustomProps = {
  navExpand: boolean;
  setNavExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavCustom({
  navExpand,
  setNavExpand,
}: NavCustomProps) {
  const router = useRouter();

  const handleAbout = () => {
    setNavExpand(prev => !prev);
    router.push('/industrial');
  };

  const handlePredicao = () => {
    setNavExpand(prev => !prev);
    router.push('/industrial/predicao');
  };

  const handleListaModels = () => {
    setNavExpand(prev => !prev);
    router.push('/industrial/listarmodelos');
  };

  const handleTreinarModels = () => {
    setNavExpand(prev => !prev);
    router.push('/industrial/treinomodelo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navegação</Text>

      <Pressable
        style={styles.button}
        onPress={handleAbout}
      >
        <Text style={styles.buttonText}>
          Sobre os dados e os modelos
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={handleListaModels}
      >
        <Text style={styles.buttonText}>
          Lista de Modelos
        </Text>
      </Pressable>


      <Pressable
        style={styles.button}
        onPress={handlePredicao}
      >
        <Text style={styles.buttonText}>
          Predição
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={handleTreinarModels}
      >
        <Text style={styles.buttonText}>
          Treino de modelos
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
    backgroundColor: '#222',
    height: 52,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
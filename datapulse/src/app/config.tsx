import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useClerk, useUser } from '@clerk/expo';
import { useRouter } from 'expo-router';
import ButtonSocialCustom from '@/components/ui/ButtonSocialCustom';

export default function Config() {

    const { signOut } = useClerk();
    const { user } = useUser();
    const router = useRouter();

    const handleSignOut = async () => {
    try {
        await signOut();
        router.replace('/');
    } catch (error) {
        console.error('Erro ao sair:', error);
    }
    };




  return (
    <View style={styles.container}>

      {user?.imageUrl && (
        <Image
          source={{ uri: user.imageUrl }}
          style={styles.avatar}
        />
      )}

      <Text style={styles.title}>
        Olá, {user?.firstName || 'usuário'}!
      </Text>

      <Text style={styles.label}>
        Nome
      </Text>

      <Text style={styles.value}>
        {user?.fullName || 'Não informado'}
      </Text>

      <Text style={styles.label}>
        E-mail
      </Text>

      <Text style={styles.value}>
        {user?.primaryEmailAddress?.emailAddress ||
          'Não informado'}
      </Text>

      <Text style={styles.label}>
        ID do usuário
      </Text>

      <Text style={styles.value}>
        {user?.id}
      </Text>
        <View style={styles.columns}>

                {/* GOOGLE */}

                <View style={styles.col}>
        <ButtonSocialCustom
        style={{ backgroundColor: '#e96161', width: 200, color: '#000000' }}
        title="Desconectar"
        image={require('@/assets/images/icon-sair.png')}
        onPress={handleSignOut}
        />
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    columns: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    marginVertical: 10,

  },

  col: {

    flex: 1,

    marginHorizontal: 5,

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    color: '#777',
    marginTop: 15,
  },

  value: {
    fontSize: 18,
    marginTop: 5,
  },
});
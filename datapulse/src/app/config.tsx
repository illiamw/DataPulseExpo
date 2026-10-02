import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { useClerk, useUser } from '@clerk/expo';
import { useRouter } from 'expo-router';
import ButtonSocialCustom from '@/components/ui/ButtonSocialCustom';

type ConfigProps = {
  configExpanded: boolean;
  setConfigExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};


export default function Config({
  configExpanded,
  setConfigExpanded,
}: ConfigProps) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const handleHome = () => {
    setConfigExpanded(!configExpanded);
    router.replace('/home');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.content,
          isDesktop && styles.contentDesktop,
        ]}
      >





        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>
            DATAPULSE
          </Text>

          <Text style={styles.title}>
            Configurações
          </Text>

          <Text style={styles.subtitle}>
            Gerencie suas informações de perfil e acesso à aplicação.
          </Text>
        </View>

        {/* PERFIL */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            {user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>
                  {(user?.firstName?.[0] || 'U').toUpperCase()}
                </Text>
              </View>
            )}

            <View style={styles.profileInfo}>
              <Text style={styles.greeting}>
                Olá,
              </Text>

              <Text style={styles.profileName}>
                {user?.firstName || 'Usuário'}
              </Text>

              <Text style={styles.profileEmail}>
                {user?.primaryEmailAddress?.emailAddress ||
                  'E-mail não informado'}
              </Text>
            </View>
          </View>
        </View>

        {/* INFORMAÇÕES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Informações da conta
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>
                  👤
                </Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.label}>
                  Nome
                </Text>

                <Text style={styles.value}>
                  {user?.fullName || 'Não informado'}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>
                  ✉
                </Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.label}>
                  E-mail
                </Text>

                <Text style={styles.value}>
                  {user?.primaryEmailAddress?.emailAddress ||
                    'Não informado'}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>
                  #
                </Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.label}>
                  ID do usuário
                </Text>

                <Text
                  style={styles.value}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                >
                  {user?.id || 'Não informado'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* AÇÕES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Ações
          </Text>

          <View
            style={[
              styles.actions,
              isDesktop && styles.actionsDesktop,
            ]}
          >
            {/* HOME */}
            <Pressable
              style={({ pressed }) => [
                styles.homeButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleHome}
            >
              <View style={styles.homeIcon}>
                <Text style={styles.homeIconText}>
                  ⌂
                </Text>
              </View>

              <View style={styles.buttonContent}>
                <Text style={styles.homeButtonTitle}>
                  Home
                </Text>

                <Text style={styles.homeButtonDescription}>
                  Voltar para a página inicial
                </Text>
              </View>

              <Text style={styles.arrow}>
                →
              </Text>
            </Pressable>

            {/* SAIR */}
            <View style={styles.logoutWrapper}>
              <ButtonSocialCustom
                style={styles.logoutButton}
                title="Desconectar"
                image={require('@/assets/images/icon-sair.png')}
                onPress={handleSignOut}
              />
            </View>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            DataPulse
          </Text>

          <Text style={styles.footerDescription}>
            Plataforma de análise e predição industrial
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  contentContainer: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  content: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
  },

  contentDesktop: {
    maxWidth: 850,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    marginBottom: 28,
  },

  eyebrow: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#0284C7',
    marginBottom: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#64748B',
    maxWidth: 600,
  },

  /* =========================
     PERFIL
  ========================= */

  profileCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: '#38BDF8',
  },

  avatarPlaceholder: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0284C7',
  },

  avatarPlaceholderText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 18,
  },

  greeting: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 2,
  },

  profileName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },

  profileEmail: {
    color: '#CBD5E1',
    fontSize: 14,
  },

  /* =========================
     SEÇÕES
  ========================= */

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },

  /* =========================
     INFORMAÇÕES
  ========================= */

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    marginRight: 14,
  },

  infoIconText: {
    fontSize: 18,
    color: '#0284C7',
  },

  infoContent: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  value: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },

  /* =========================
     AÇÕES
  ========================= */

  actions: {
    gap: 12,
  },

  actionsDesktop: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  homeButton: {
    flex: 1,
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },

  homeIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F2FE',
    marginRight: 14,
  },

  homeIconText: {
    fontSize: 26,
    color: '#0284C7',
    fontWeight: '700',
  },

  buttonContent: {
    flex: 1,
  },

  homeButtonTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 3,
  },

  homeButtonDescription: {
    fontSize: 13,
    color: '#64748B',
  },

  arrow: {
    fontSize: 24,
    color: '#0284C7',
    fontWeight: '600',
    marginLeft: 10,
  },

  logoutWrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  logoutButton: {
    width: '100%',
    minHeight: 82,
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
    color: '#991B1B',
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },

  footerText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0284C7',
    marginBottom: 4,
  },

  footerDescription: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});

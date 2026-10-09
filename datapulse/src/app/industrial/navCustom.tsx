import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  useColorScheme
} from 'react-native';
import { useRouter } from 'expo-router';

type NavCustomProps = {
  navExpand: boolean;
  setNavExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavigationItemProps = {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
};

function NavigationItem({
  icon,
  title,
  description,
  onPress,
}: NavigationItemProps) {
  const colorScheme = useColorScheme();
  
    const styles =
      colorScheme === 'dark'
        ? themeStyles.dark
        : themeStyles.light;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.navigationItem,
        pressed && styles.navigationItemPressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          {icon}
        </Text>
      </View>

      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>
          {title}
        </Text>

        <Text style={styles.itemDescription}>
          {description}
        </Text>
      </View>

      <Text style={styles.arrow}>
        →
      </Text>
    </Pressable>
  );
}

export default function NavCustom({
  navExpand,
  setNavExpand,
}: NavCustomProps) {
  const colorScheme = useColorScheme();
  
    const styles =
      colorScheme === 'dark'
        ? themeStyles.dark
        : themeStyles.light;
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isDesktop = width >= 768;

  const closeNavigation = () => {
    setNavExpand(false);
  };

  const handleAbout = () => {
    closeNavigation();
    router.push('/industrial');
  };

  const handlePredicao = () => {
    closeNavigation();
    router.push('/industrial/predicao');
  };

  const handleListaModels = () => {
    closeNavigation();
    router.push('/industrial/listarmodelos');
  };

  const handleTreinarModels = () => {
    closeNavigation();
    router.push('/industrial/treinomodelo');
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          isDesktop && styles.contentDesktop,
        ]}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>
              DATAPULSE
            </Text>

            <Text style={styles.title}>
              Navegação
            </Text>

            <Text style={styles.subtitle}>
              Explore os recursos da aplicação industrial.
            </Text>
          </View>

          
        </View>

        {/* NAVEGAÇÃO */}
        <View style={styles.navigationCard}>
          <NavigationItem
            icon="⚙"
            title="Sobre os dados e modelos"
            description="Conheça os dados, modelos e arquitetura do DataPulse."
            onPress={handleAbout}
          />

          <NavigationItem
            icon="▦"
            title="Lista de modelos"
            description="Visualize os modelos disponíveis para utilização."
            onPress={handleListaModels}
          />

          <NavigationItem
            icon="⌁"
            title="Predição"
            description="Execute uma previsão utilizando um modelo treinado."
            onPress={handlePredicao}
          />

          <NavigationItem
            icon="◈"
            title="Treino de modelos"
            description="Execute experimentos e treine novos modelos."
            onPress={handleTreinarModels}
          />
        </View>

        {/* STATUS */}
        <View style={styles.statusCard}>
          <View style={styles.statusIndicator} />

          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>
              Ambiente industrial
            </Text>

            <Text style={styles.statusDescription}>
              Dados, modelos e predições disponíveis.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const themeStyles = {
light: StyleSheet.create({
/* =========================
CONTAINER
========================= */


container: {
  flex: 1,
  backgroundColor: '#F8FAFC',
},

content: {
  width: '100%',
  maxWidth: 700,
  alignSelf: 'center',
  paddingHorizontal: 20,
  paddingBottom: 40,
  paddingTop: 120,
},

contentDesktop: {
  maxWidth: 850,
},

/* =========================
   HEADER
========================= */

header: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: 24,
},

eyebrow: {
  fontSize: 12,
  fontWeight: '800',
  letterSpacing: 1.5,
  color: '#0284C7',
  marginBottom: 6,
},

title: {
  fontSize: 30,
  fontWeight: '800',
  color: '#0F172A',
  marginBottom: 6,
},

subtitle: {
  fontSize: 15,
  lineHeight: 22,
  color: '#64748B',
  maxWidth: 550,
},

/* =========================
   FECHAR
========================= */

closeButton: {
  width: 42,
  height: 42,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E2E8F0',
},

closeButtonPressed: {
  opacity: 0.65,
  transform: [{ scale: 0.95 }],
},

closeButtonText: {
  fontSize: 28,
  lineHeight: 30,
  color: '#64748B',
  fontWeight: '400',
},

/* =========================
   CARD DE NAVEGAÇÃO
========================= */

navigationCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  padding: 12,
  borderWidth: 1,
  borderColor: '#E2E8F0',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.04,
  shadowRadius: 10,
  elevation: 2,
},

/* =========================
   ITEM
========================= */

navigationItem: {
  minHeight: 82,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 14,
  paddingVertical: 12,
  borderRadius: 15,
},

navigationItemPressed: {
  backgroundColor: '#F0F9FF',
  transform: [{ scale: 0.99 }],
},

iconContainer: {
  width: 48,
  height: 48,
  borderRadius: 14,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#E0F2FE',
  marginRight: 14,
},

icon: {
  fontSize: 22,
  color: '#0284C7',
},

itemContent: {
  flex: 1,
  paddingRight: 10,
},

itemTitle: {
  fontSize: 16,
  fontWeight: '800',
  color: '#0F172A',
  marginBottom: 4,
},

itemDescription: {
  fontSize: 13,
  lineHeight: 19,
  color: '#64748B',
},

arrow: {
  fontSize: 23,
  color: '#0284C7',
  fontWeight: '600',
},

/* =========================
   STATUS
========================= */

statusCard: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 16,
  paddingHorizontal: 18,
  paddingVertical: 16,
  borderRadius: 16,
  backgroundColor: '#F0FDF4',
  borderWidth: 1,
  borderColor: '#BBF7D0',
},

statusIndicator: {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: '#16A34A',
  marginRight: 12,
},

statusContent: {
  flex: 1,
},

statusTitle: {
  fontSize: 14,
  fontWeight: '800',
  color: '#166534',
  marginBottom: 2,
},

statusDescription: {
  fontSize: 12,
  color: '#15803D',
},


}),

dark: StyleSheet.create({
/* =========================
CONTAINER
========================= */


container: {
  flex: 1,
  backgroundColor: '#0B1120',
},

content: {
  width: '100%',
  maxWidth: 700,
  alignSelf: 'center',
  paddingHorizontal: 20,
  paddingBottom: 40,
  paddingTop: 120,
},

contentDesktop: {
  maxWidth: 850,
},

/* =========================
   HEADER
========================= */

header: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: 24,
},

eyebrow: {
  fontSize: 12,
  fontWeight: '800',
  letterSpacing: 1.5,
  color: '#38BDF8',
  marginBottom: 6,
},

title: {
  fontSize: 30,
  fontWeight: '800',
  color: '#F1F5F9',
  marginBottom: 6,
},

subtitle: {
  fontSize: 15,
  lineHeight: 22,
  color: '#94A3B8',
  maxWidth: 550,
},

/* =========================
   FECHAR
========================= */

closeButton: {
  width: 42,
  height: 42,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#172033',
  borderWidth: 1,
  borderColor: '#334155',
},

closeButtonPressed: {
  opacity: 0.65,
  transform: [{ scale: 0.95 }],
},

closeButtonText: {
  fontSize: 28,
  lineHeight: 30,
  color: '#CBD5E1',
  fontWeight: '400',
},

/* =========================
   CARD DE NAVEGAÇÃO
========================= */

navigationCard: {
  backgroundColor: '#111827',
  borderRadius: 20,
  padding: 12,
  borderWidth: 1,
  borderColor: '#263449',
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  elevation: 3,
},

/* =========================
   ITEM
========================= */

navigationItem: {
  minHeight: 82,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 14,
  paddingVertical: 12,
  borderRadius: 15,
},

navigationItemPressed: {
  backgroundColor: '#172B40',
  transform: [{ scale: 0.99 }],
},

iconContainer: {
  width: 48,
  height: 48,
  borderRadius: 14,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#153047',
  marginRight: 14,
},

icon: {
  fontSize: 22,
  color: '#38BDF8',
},

itemContent: {
  flex: 1,
  paddingRight: 10,
},

itemTitle: {
  fontSize: 16,
  fontWeight: '800',
  color: '#F1F5F9',
  marginBottom: 4,
},

itemDescription: {
  fontSize: 13,
  lineHeight: 19,
  color: '#94A3B8',
},

arrow: {
  fontSize: 23,
  color: '#38BDF8',
  fontWeight: '600',
},

/* =========================
   STATUS
========================= */

statusCard: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 16,
  paddingHorizontal: 18,
  paddingVertical: 16,
  borderRadius: 16,
  backgroundColor: '#10291F',
  borderWidth: 1,
  borderColor: '#24543B',
},

statusIndicator: {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: '#4ADE80',
  marginRight: 12,
},

statusContent: {
  flex: 1,
},

statusTitle: {
  fontSize: 14,
  fontWeight: '800',
  color: '#86EFAC',
  marginBottom: 2,
},

statusDescription: {
  fontSize: 12,
  color: '#4ADE80',
},


}),
};

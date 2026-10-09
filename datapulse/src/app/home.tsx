import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  useWindowDimensions,
  useColorScheme
} from "react-native";

import { useRouter } from "expo-router";


export default function Industrial() {
  const colorScheme = useColorScheme();

  const styles =
    colorScheme === 'dark'
      ? themeStyles.dark
      : themeStyles.light;

  const router = useRouter();

  const { width } = useWindowDimensions();

  const isDesktop = width >= 768;


  const handleIndustrial = () => {
    router.push("/industrial");
  };


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <View style={styles.hero}>

        <View style={styles.heroContent}>

          <Text style={styles.badge}>
            MLOps • Data Engineering • Machine Learning • Development Mobile/Web
          </Text>


          <Text style={styles.heroTitle}>
            DataPulse
          </Text>


          <Text style={styles.heroSubtitle}>
            Demonstração de soluções completas de dados e Machine Learning
            com emprego de engenharia de dados para compor uma abordagem
            integrada.
          </Text>


          <Text style={styles.heroDescription}>
            Um projeto completo de dados e Machine Learning que integra
            engenharia de dados, modelos preditivos, MLflow, APIs,
            containers e CI/CD em uma única solução.
          </Text>

        </View>

      </View>


      {/* ===================================================== */}
      {/* APLICAÇÕES */}
      {/* ===================================================== */}

      <View style={styles.applicationsSection}>

        <View style={styles.header}>

          <Text style={styles.eyebrow}>
            DATAPULSE
          </Text>


          <Text style={styles.sectionTitle}>
            Aplicações
          </Text>


          <Text style={styles.subtitle}>
            Explore as aplicações desenvolvidas utilizando dados,
            Machine Learning e práticas de MLOps.
          </Text>

        </View>


        {/* ================================================= */}
        {/* CARDS */}
        {/* ================================================= */}

        <View
          style={[
            styles.cardsContainer,
            isDesktop && styles.cardsContainerDesktop,
          ]}
        >

          {/* =============================================== */}
          {/* FALHA LINHA INDUSTRIAL */}
          {/* =============================================== */}

          <Pressable
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={handleIndustrial}
          >

            {/* ÍCONE */}

            <View style={styles.iconContainer}>

              <Text style={styles.icon}>
                ⚙
              </Text>

            </View>


            {/* CONTEÚDO */}

            <View style={styles.cardContent}>

              <View style={styles.cardHeader}>

                <Text style={styles.cardTitle}>
                  Falha Linha Industrial
                </Text>


                <View style={styles.statusBadge}>

                  <Text style={styles.statusText}>
                    DATA • ML • OPS
                  </Text>

                </View>

              </View>


              <Text style={styles.cardDescription}>
                Monitoramento e predição de falhas em uma linha
                industrial utilizando dados de sensores e modelos
                de Machine Learning.
              </Text>


              <View style={styles.cardFooter}>

                <Text style={styles.cardAction}>
                  Acessar aplicação
                </Text>


                <Text style={styles.arrow}>
                  →
                </Text>

              </View>

            </View>

          </Pressable>


          {/* =============================================== */}
          {/* FUTURAS APLICAÇÕES */}
          {/* =============================================== */}

          <View style={styles.comingSoonCard}>

            <View style={styles.comingSoonIcon}>

              <Text style={styles.comingSoonIconText}>
                +
              </Text>

            </View>


            <Text style={styles.comingSoonTitle}>
              Em breve - Novas aplicações
            </Text>


            <Text style={styles.comingSoonText}>
              Novos projetos e aplicações poderão ser adicionados
              ao DataPulse.
            </Text>

          </View>

        </View>

      </View>


      {/* ===================================================== */}
      {/* FINAL */}
      {/* ===================================================== */}

      <View style={styles.finalSection}>

        <Text style={styles.finalEyebrow}>
          DATA • ML • OPS
        </Text>


        <Text style={styles.finalTitle}>
          Do dado bruto à predição
        </Text>


        <Text style={styles.finalText}>
          O DataPulse reúne engenharia de dados, arquitetura
          medalhão, Machine Learning, MLflow, APIs, containers
          e CI/CD em um fluxo único de desenvolvimento e entrega.
        </Text>


        <View style={styles.finalFlow}>

          <Text style={styles.finalFlowText}>
            Dados
          </Text>


          <Text style={styles.finalArrow}>
            →
          </Text>


          <Text style={styles.finalFlowText}>
            Pipeline
          </Text>


          <Text style={styles.finalArrow}>
            →
          </Text>


          <Text style={styles.finalFlowText}>
            Modelo
          </Text>


          <Text style={styles.finalArrow}>
            →
          </Text>


          <Text style={styles.finalFlowText}>
            API
          </Text>


          <Text style={styles.finalArrow}>
            →
          </Text>


          <Text style={styles.finalFlowText}>
            Aplicação
          </Text>

        </View>

      </View>

    </ScrollView>
  );
}


// =========================================================
// STYLES — LIGHT / DARK
// =========================================================

const themeStyles = {
  light: StyleSheet.create({
    // CONTAINER
    container: {
      flex: 1,
      backgroundColor: '#F8FAFC',
    },
    contentContainer: {
      paddingBottom: 0,
    },

    // HERO
    hero: {
      backgroundColor: '#0F172A',
      paddingHorizontal: 24,
      paddingVertical: 80,
      paddingTop: 120,
    },
    heroContent: {
      width: '100%',
      maxWidth: 1100,
      alignSelf: 'center',
    },
    badge: {
      color: '#38BDF8',
      fontSize: 13,
      fontWeight: '700',
      letterSpacing: 1,
      marginBottom: 20,
      textTransform: 'uppercase',
    },
    heroTitle: {
      color: '#FFFFFF',
      fontSize: 58,
      fontWeight: '900',
      marginBottom: 16,
    },
    heroSubtitle: {
      color: '#E2E8F0',
      fontSize: 28,
      lineHeight: 38,
      fontWeight: '600',
      maxWidth: 800,
    },
    heroDescription: {
      color: '#94A3B8',
      fontSize: 17,
      lineHeight: 28,
      marginTop: 24,
      maxWidth: 760,
    },

    // APPLICATIONS
    applicationsSection: {
      width: '100%',
      maxWidth: 1100,
      alignSelf: 'center',
      paddingHorizontal: 24,
      paddingTop: 80,
      paddingBottom: 80,
    },

    // HEADER
    header: {
      width: '100%',
      marginBottom: 40,
    },
    eyebrow: {
      color: '#0284C7',
      fontSize: 13,
      fontWeight: '900',
      letterSpacing: 1.5,
      marginBottom: 8,
    },
    sectionTitle: {
      color: '#0F172A',
      fontSize: 38,
      fontWeight: '900',
    },
    subtitle: {
      color: '#64748B',
      fontSize: 16,
      lineHeight: 25,
      marginTop: 10,
      maxWidth: 650,
    },

    // CARDS
    cardsContainer: {
      width: '100%',
      gap: 18,
    },
    cardsContainerDesktop: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },

    // INDUSTRIAL CARD
    card: {
      flex: 1,
      minHeight: 240,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 26,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    cardPressed: {
      transform: [{ scale: 0.98 }],
      opacity: 0.9,
    },

    // ÍCONE
    iconContainer: {
      width: 58,
      height: 58,
      borderRadius: 16,
      backgroundColor: '#E0F2FE',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 22,
    },
    icon: {
      fontSize: 30,
    },

    // CARD CONTENT
    cardContent: {
      flex: 1,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    },
    cardTitle: {
      flex: 1,
      color: '#0F172A',
      fontSize: 21,
      fontWeight: '800',
    },
    statusBadge: {
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 7,
      backgroundColor: '#F0F9FF',
      borderWidth: 1,
      borderColor: '#BAE6FD',
    },
    statusText: {
      color: '#0284C7',
      fontSize: 11,
      fontWeight: '900',
    },
    cardDescription: {
      color: '#64748B',
      fontSize: 14,
      lineHeight: 22,
      marginTop: 12,
      maxWidth: 550,
    },

    // CARD FOOTER
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 24,
    },
    cardAction: {
      color: '#0284C7',
      fontSize: 14,
      fontWeight: '800',
    },
    arrow: {
      color: '#0284C7',
      fontSize: 20,
      marginLeft: 8,
    },

    // COMING SOON
    comingSoonCard: {
      flex: 1,
      minHeight: 240,
      borderRadius: 20,
      padding: 26,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: '#CBD5E1',
      backgroundColor: '#F8FAFC',
      justifyContent: 'center',
    },
    comingSoonIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: '#E2E8F0',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 18,
    },
    comingSoonIconText: {
      color: '#64748B',
      fontSize: 28,
      fontWeight: '300',
    },
    comingSoonTitle: {
      color: '#334155',
      fontSize: 18,
      fontWeight: '800',
    },
    comingSoonText: {
      color: '#64748B',
      fontSize: 14,
      lineHeight: 21,
      marginTop: 8,
      maxWidth: 400,
    },

    // FINAL
    finalSection: {
      backgroundColor: '#0F172A',
      paddingVertical: 80,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    finalEyebrow: {
      color: '#38BDF8',
      fontSize: 13,
      fontWeight: '900',
      letterSpacing: 2,
    },
    finalTitle: {
      color: '#FFFFFF',
      fontSize: 38,
      fontWeight: '900',
      textAlign: 'center',
      marginTop: 12,
    },
    finalText: {
      color: '#94A3B8',
      fontSize: 16,
      lineHeight: 26,
      textAlign: 'center',
      maxWidth: 750,
      marginTop: 20,
    },
    finalFlow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      marginTop: 36,
    },
    finalFlowText: {
      color: '#FFFFFF',
      fontWeight: '700',
    },
    finalArrow: {
      color: '#38BDF8',
      fontSize: 20,
    },
  }),

  dark: StyleSheet.create({
    // CONTAINER
    container: {
      flex: 1,
      backgroundColor: '#0B1120',
    },
    contentContainer: {
      paddingBottom: 0,
    },

    // HERO
    hero: {
      backgroundColor: '#020617',
      paddingHorizontal: 24,
      paddingVertical: 80,
      paddingTop: 120,
    },
    heroContent: {
      width: '100%',
      maxWidth: 1100,
      alignSelf: 'center',
    },
    badge: {
      color: '#38BDF8',
      fontSize: 13,
      fontWeight: '700',
      letterSpacing: 1,
      marginBottom: 20,
      textTransform: 'uppercase',
    },
    heroTitle: {
      color: '#F8FAFC',
      fontSize: 58,
      fontWeight: '900',
      marginBottom: 16,
    },
    heroSubtitle: {
      color: '#E2E8F0',
      fontSize: 28,
      lineHeight: 38,
      fontWeight: '600',
      maxWidth: 800,
    },
    heroDescription: {
      color: '#94A3B8',
      fontSize: 17,
      lineHeight: 28,
      marginTop: 24,
      maxWidth: 760,
    },

    // APPLICATIONS
    applicationsSection: {
      width: '100%',
      maxWidth: 1100,
      alignSelf: 'center',
      paddingHorizontal: 24,
      paddingTop: 80,
      paddingBottom: 80,
    },

    // HEADER
    header: {
      width: '100%',
      marginBottom: 40,
    },
    eyebrow: {
      color: '#38BDF8',
      fontSize: 13,
      fontWeight: '900',
      letterSpacing: 1.5,
      marginBottom: 8,
    },
    sectionTitle: {
      color: '#F1F5F9',
      fontSize: 38,
      fontWeight: '900',
    },
    subtitle: {
      color: '#94A3B8',
      fontSize: 16,
      lineHeight: 25,
      marginTop: 10,
      maxWidth: 650,
    },

    // CARDS
    cardsContainer: {
      width: '100%',
      gap: 18,
    },
    cardsContainerDesktop: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },

    // INDUSTRIAL CARD
    card: {
      flex: 1,
      minHeight: 240,
      backgroundColor: '#111827',
      borderRadius: 20,
      padding: 26,
      borderWidth: 1,
      borderColor: '#334155',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 2,
    },
    cardPressed: {
      transform: [{ scale: 0.98 }],
      opacity: 0.85,
    },

    // ÍCONE
    iconContainer: {
      width: 58,
      height: 58,
      borderRadius: 16,
      backgroundColor: '#172554',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 22,
    },
    icon: {
      fontSize: 30,
    },

    // CARD CONTENT
    cardContent: {
      flex: 1,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    },
    cardTitle: {
      flex: 1,
      color: '#F1F5F9',
      fontSize: 21,
      fontWeight: '800',
    },
    statusBadge: {
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 7,
      backgroundColor: '#082F49',
      borderWidth: 1,
      borderColor: '#075985',
    },
    statusText: {
      color: '#7DD3FC',
      fontSize: 11,
      fontWeight: '900',
    },
    cardDescription: {
      color: '#94A3B8',
      fontSize: 14,
      lineHeight: 22,
      marginTop: 12,
      maxWidth: 550,
    },

    // CARD FOOTER
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 24,
    },
    cardAction: {
      color: '#38BDF8',
      fontSize: 14,
      fontWeight: '800',
    },
    arrow: {
      color: '#38BDF8',
      fontSize: 20,
      marginLeft: 8,
    },

    // COMING SOON
    comingSoonCard: {
      flex: 1,
      minHeight: 240,
      borderRadius: 20,
      padding: 26,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: '#475569',
      backgroundColor: '#0F172A',
      justifyContent: 'center',
    },
    comingSoonIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: '#1E293B',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 18,
    },
    comingSoonIconText: {
      color: '#94A3B8',
      fontSize: 28,
      fontWeight: '300',
    },
    comingSoonTitle: {
      color: '#E2E8F0',
      fontSize: 18,
      fontWeight: '800',
    },
    comingSoonText: {
      color: '#94A3B8',
      fontSize: 14,
      lineHeight: 21,
      marginTop: 8,
      maxWidth: 400,
    },

    // FINAL
    finalSection: {
      backgroundColor: '#020617',
      paddingVertical: 80,
      paddingHorizontal: 24,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#1E293B',
    },
    finalEyebrow: {
      color: '#38BDF8',
      fontSize: 13,
      fontWeight: '900',
      letterSpacing: 2,
    },
    finalTitle: {
      color: '#F8FAFC',
      fontSize: 38,
      fontWeight: '900',
      textAlign: 'center',
      marginTop: 12,
    },
    finalText: {
      color: '#94A3B8',
      fontSize: 16,
      lineHeight: 26,
      textAlign: 'center',
      maxWidth: 750,
      marginTop: 20,
    },
    finalFlow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      marginTop: 36,
    },
    finalFlowText: {
      color: '#F8FAFC',
      fontWeight: '700',
    },
    finalArrow: {
      color: '#38BDF8',
      fontSize: 20,
    },
  }),
};

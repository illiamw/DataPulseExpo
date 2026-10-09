import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  useColorScheme
} from 'react-native';

import ButtonCustom from '@/components/ui/ButtonCustom';

const API_URL = 'http://163.176.161.159:8000/models';
const MLFLOW_URL = 'http://163.176.161.159:5000/#/experiments';

interface Model {
  model_id: string;
  model_name: string;
  run_id: string;
  run_name: string;
  status: string;
  accuracy: number | null;
  precision: number | null;
  f1: number | null;
}

interface ModelsResponse {
  total: number;
  models: Model[];
}

export default function ListarModelos() {
  const colorScheme = useColorScheme();
  
    const styles =
      colorScheme === 'dark'
        ? themeStyles.dark
        : themeStyles.light;
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  // =====================================================
  // BUSCAR MODELOS
  // =====================================================

  const carregarModelos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const data: ModelsResponse = await response.json();

      setModels(data.models ?? []);
    } catch (err) {
      console.error('Erro ao carregar modelos:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível carregar os modelos.'
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CARREGAR AO ABRIR
  // =====================================================

  useEffect(() => {
    carregarModelos();
  }, []);

  // =====================================================
  // ABRIR MLFLOW
  // =====================================================

  const abrirExperimentos = async () => {
    try {
      await Linking.openURL(MLFLOW_URL);
    } catch (err) {
      console.error('Erro ao abrir MLflow:', err);
    }
  };

  // =====================================================
  // FORMATAR MÉTRICA
  // =====================================================

  const formatarMetrica = (value: number | null) => {
    if (value === null || value === undefined) {
      return '-';
    }

    return `${(value * 100).toFixed(2)}%`;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <View style={styles.center}>
        <View style={styles.loadingCard}>
          <View style={styles.loadingIcon}>
            <ActivityIndicator size="large" color="#0284C7" />
          </View>

          <Text style={styles.loadingTitle}>
            Carregando modelos
          </Text>

          <Text style={styles.loadingText}>
            Consultando os modelos registrados no DataPulse.
          </Text>
        </View>
      </View>
    );
  }

  // =====================================================
  // ERRO
  // =====================================================

  if (error) {
    return (
      <View style={styles.center}>
        <View style={styles.errorCard}>
          <View style={styles.errorIcon}>
            <Text style={styles.errorIconText}>
              !
            </Text>
          </View>

          <Text style={styles.errorTitle}>
            Não foi possível carregar os modelos
          </Text>

          <Text style={styles.errorText}>
            {error}
          </Text>

          <View style={styles.buttonContainer}>
            <ButtonCustom
              title="Tentar novamente"
              onPress={carregarModelos}
            />
          </View>
        </View>
      </View>
    );
  }

  // =====================================================
  // TELA
  // =====================================================

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.page,
          isDesktop && styles.pageDesktop,
        ]}
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerBadge}>
                      <View
                        style={
                          styles.headerDot
                        }
                      />
            
                      <Text
                        style={
                          styles.headerBadgeText
                        }
                      >
                        Modelos / MLflow
                      </Text>
                    </View>

            <Text style={styles.title}>
              Modelos experimentados
            </Text>

            <Text style={styles.subtitle}>
              Consulte os modelos registrados e suas principais
              métricas de avaliação.
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.refreshButton,
              pressed && styles.refreshButtonPressed,
            ]}
            onPress={carregarModelos}
          >
            <Text style={styles.refreshIcon}>
              ↻
            </Text>
          </Pressable>
        </View>

        {/* ================================================= */}
        {/* RESUMO */}
        {/* ================================================= */}

        <View
          style={[
            styles.summaryGrid,
            isDesktop && styles.summaryGridDesktop,
          ]}
        >
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Text style={styles.summaryIconText}>
                ◈
              </Text>
            </View>

            <View>
              <Text style={styles.summaryLabel}>
                Modelos
              </Text>

              <Text style={styles.summaryValue}>
                {models.length}
              </Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Text style={styles.summaryIconText}>
                ✓
              </Text>
            </View>

            <View>
              <Text style={styles.summaryLabel}>
                Disponíveis
              </Text>

              <Text style={styles.summaryValue}>
                {
                  models.filter(
                    model => model.status === 'READY'
                  ).length
                }
              </Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Text style={styles.summaryIconText}>
                ML
              </Text>
            </View>

            <View>
              <Text style={styles.summaryLabel}>
                Plataforma
              </Text>

              <Text style={styles.summaryValueSmall}>
                MLflow
              </Text>
            </View>
          </View>
        </View>

        {/* ================================================= */}
        {/* MLFLOW */}
        {/* ================================================= */}

        <View style={styles.mlflowCard}>
          <View style={styles.mlflowIcon}>
            <Text style={styles.mlflowIconText}>
              ML
            </Text>
          </View>

          <View style={styles.mlflowContent}>
            <Text style={styles.mlflowTitle}>
              Experimentos no MLflow
            </Text>

            <Text style={styles.mlflowDescription}>
              Consulte experimentos, métricas e informações
              adicionais registrados durante o treinamento.
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.mlflowAction,
              pressed && styles.mlflowActionPressed,
            ]}
            onPress={abrirExperimentos}
          >
            <Text style={styles.mlflowActionText}>
              Abrir
            </Text>

            <Text style={styles.mlflowArrow}>
              →
            </Text>
          </Pressable>
        </View>

        {/* ================================================= */}
        {/* TÍTULO DA LISTA */}
        {/* ================================================= */}

        <View style={styles.listHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Modelos disponíveis
            </Text>

            <Text style={styles.sectionSubtitle}>
              {models.length === 1
                ? '1 modelo encontrado'
                : `${models.length} modelos encontrados`}
            </Text>
          </View>
        </View>

        {/* ================================================= */}
        {/* LISTA */}
        {/* ================================================= */}

        {models.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>
                ◈
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              Nenhum modelo encontrado
            </Text>

            <Text style={styles.emptyText}>
              Execute um experimento para que os modelos
              apareçam nesta lista.
            </Text>

            <Pressable
              style={styles.emptyButton}
              onPress={carregarModelos}
            >
              <Text style={styles.emptyButtonText}>
                Atualizar lista
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={[
              styles.list,
              isDesktop && styles.listDesktop,
            ]}
          >
            {models.map((model, index) => {
              const isReady = model.status === 'READY';

              return (
                <View
                  key={model.model_id}
                  style={[
                    styles.card,
                    isDesktop && styles.cardDesktop,
                  ]}
                >
                  {/* CARD HEADER */}

                  <View style={styles.cardHeader}>
                    <View style={styles.modelIdentity}>
                      <View style={styles.modelNumber}>
                        <Text style={styles.modelNumberText}>
                          {String(index + 1).padStart(2, '0')}
                        </Text>
                      </View>

                      <View style={styles.modelTitleContainer}>
                        <Text
                          style={styles.modelName}
                          numberOfLines={1}
                        >
                          {model.run_name}
                        </Text>

                        <Text style={styles.modelType}>
                          {model.model_name}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.status,
                        isReady
                          ? styles.statusReady
                          : styles.statusProcessing,
                      ]}
                    >
                      <View
                        style={[
                          styles.statusDot,
                          isReady
                            ? styles.statusDotReady
                            : styles.statusDotProcessing,
                        ]}
                      />

                      <Text
                        style={[
                          styles.statusText,
                          isReady
                            ? styles.statusTextReady
                            : styles.statusTextProcessing,
                        ]}
                      >
                        {isReady
                          ? 'Pronto'
                          : 'Processando'}
                      </Text>
                    </View>
                  </View>

                  {/* IDENTIFICADORES */}

                  <View style={styles.identifiers}>
                    <View style={styles.infoRow}>
                      <Text style={styles.label}>
                        MODEL ID
                      </Text>

                      <Text
                        style={styles.value}
                        numberOfLines={1}
                        ellipsizeMode="middle"
                      >
                        {model.model_id}
                      </Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Text style={styles.label}>
                        RUN ID
                      </Text>

                      <Text
                        style={styles.value}
                        numberOfLines={1}
                        ellipsizeMode="middle"
                      >
                        {model.run_id}
                      </Text>
                    </View>
                  </View>

                  {/* MÉTRICAS */}

                  <View style={styles.metricsHeader}>
                    <Text style={styles.metricsTitle}>
                      Métricas de avaliação
                    </Text>
                  </View>

                  <View style={styles.metrics}>
                    <View style={styles.metric}>
                      <Text style={styles.metricLabel}>
                        Accuracy
                      </Text>

                      <Text style={styles.metricValue}>
                        {formatarMetrica(model.accuracy)}
                      </Text>
                    </View>

                    <View style={styles.metricDivider} />

                    <View style={styles.metric}>
                      <Text style={styles.metricLabel}>
                        Precision
                      </Text>

                      <Text style={styles.metricValue}>
                        {formatarMetrica(model.precision)}
                      </Text>
                    </View>

                    <View style={styles.metricDivider} />

                    <View style={styles.metric}>
                      <Text style={styles.metricLabel}>
                        F1
                      </Text>

                      <Text style={styles.metricValue}>
                        {formatarMetrica(model.f1)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            DataPulse
          </Text>

          <Text style={styles.footerText}>
            Gestão e experimentação de modelos de Machine Learning
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// =======================================================
// ESTILOS — TEMAS CLARO E ESCURO
// =======================================================

const themeStyles = {
  light: StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 32,
    paddingTop: 120
  },

  page: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
  },

  pageDesktop: {
    maxWidth: 1100,
  },

  // =====================================================
  // LOADING
  // =====================================================

  center: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  loadingCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 32,
    alignItems: 'center',
  },

  loadingIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  loadingTitle: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },

  loadingText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },

  // =====================================================
  // ERRO
  // =====================================================

  errorCard: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 30,
    alignItems: 'center',
  },

  errorIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  errorIconText: {
    color: '#DC2626',
    fontSize: 28,
    fontWeight: '800',
  },

  errorTitle: {
    color: '#991B1B',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },

  errorText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 22,
  },

  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },

  // =====================================================
  // HEADER
  // =====================================================

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  headerContent: {
    flex: 1,
    paddingRight: 16,
  },

  headerBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 14,
    backgroundColor: '#E9EEF5',
  },

  headerDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },

  headerBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#2563EB',
  },

  eyebrow: {
    color: '#0284C7',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 7,
  },

  title: {
    color: '#0F172A',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 7,
  },

  subtitle: {
    color: '#64748B',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 650,
  },

  refreshButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  refreshButtonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.95 }],
  },

  refreshIcon: {
    color: '#0284C7',
    fontSize: 27,
    fontWeight: '500',
  },

  // =====================================================
  // RESUMO
  // =====================================================

  summaryGrid: {
    gap: 12,
    marginBottom: 16,
  },

  summaryGridDesktop: {
    flexDirection: 'row',
  },

  summaryCard: {
    flex: 1,
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 18,
  },

  summaryIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  summaryIconText: {
    color: '#0284C7',
    fontSize: 19,
    fontWeight: '800',
  },

  summaryLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 3,
  },

  summaryValue: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '800',
  },

  summaryValueSmall: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
  },

  // =====================================================
  // MLFLOW
  // =====================================================

  mlflowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },

  mlflowIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  mlflowIconText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  mlflowContent: {
    flex: 1,
  },

  mlflowTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },

  mlflowDescription: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
  },

  mlflowAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginLeft: 12,
  },

  mlflowActionPressed: {
    opacity: 0.7,
  },

  mlflowActionText: {
    color: '#0284C7',
    fontSize: 13,
    fontWeight: '800',
  },

  mlflowArrow: {
    color: '#0284C7',
    fontSize: 17,
    marginLeft: 6,
  },

  // =====================================================
  // LISTA
  // =====================================================

  listHeader: {
    marginBottom: 13,
  },

  sectionTitle: {
    color: '#0F172A',
    fontSize: 19,
    fontWeight: '800',
  },

  sectionSubtitle: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 4,
  },

  list: {
    gap: 14,
  },

  listDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // =====================================================
  // CARD
  // =====================================================

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 9,
    elevation: 2,
  },

  cardDesktop: {
    width: '48.8%',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  modelIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },

  modelNumber: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  modelNumberText: {
    color: '#0284C7',
    fontSize: 13,
    fontWeight: '800',
  },

  modelTitleContainer: {
    flex: 1,
  },

  modelName: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 3,
  },

  modelType: {
    color: '#64748B',
    fontSize: 12,
  },

  // =====================================================
  // STATUS
  // =====================================================

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusReady: {
    backgroundColor: '#F0FDF4',
  },

  statusProcessing: {
    backgroundColor: '#FFF7ED',
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },

  statusDotReady: {
    backgroundColor: '#16A34A',
  },

  statusDotProcessing: {
    backgroundColor: '#EA580C',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },

  statusTextReady: {
    color: '#15803D',
  },

  statusTextProcessing: {
    color: '#C2410C',
  },

  // =====================================================
  // IDENTIFICADORES
  // =====================================================

  identifiers: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 4,
    marginBottom: 17,
  },

  infoRow: {
    paddingVertical: 9,
  },

  label: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 4,
  },

  value: {
    color: '#334155',
    fontSize: 12,
    fontFamily: 'monospace',
  },

  // =====================================================
  // MÉTRICAS
  // =====================================================

  metricsHeader: {
    marginBottom: 10,
  },

  metricsTitle: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '700',
  },

  metrics: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },

  metric: {
    flex: 1,
    alignItems: 'center',
  },

  metricDivider: {
    width: 1,
    height: 38,
    backgroundColor: '#E2E8F0',
  },

  metricLabel: {
    color: '#94A3B8',
    fontSize: 11,
    marginBottom: 5,
  },

  metricValue: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
  },

  // =====================================================
  // EMPTY
  // =====================================================

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 40,
    alignItems: 'center',
  },

  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  emptyIconText: {
    color: '#64748B',
    fontSize: 26,
  },

  emptyTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 7,
  },

  emptyText: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 400,
    marginBottom: 20,
  },

  emptyButton: {
    backgroundColor: '#0284C7',
    borderRadius: 11,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },

  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  // =====================================================
  // FOOTER
  // =====================================================

  footer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: 35,
    paddingTop: 22,
    paddingBottom: 10,
  },

  footerTitle: {
    color: '#0284C7',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },

  footerText: {
    color: '#94A3B8',
    fontSize: 11,
    textAlign: 'center',
  },
  }),

  dark: StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 32,
    paddingTop: 120
  },

  page: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
  },

  pageDesktop: {
    maxWidth: 1100,
  },

  // =====================================================
  // LOADING
  // =====================================================

  center: {
    flex: 1,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  loadingCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#111827',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 32,
    alignItems: 'center',
  },

  loadingIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#082F49',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  loadingTitle: {
    color: '#F1F5F9',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },

  loadingText: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },

  // =====================================================
  // ERRO
  // =====================================================

  errorCard: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#111827',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7F1D1D',
    padding: 30,
    alignItems: 'center',
  },

  errorIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#450A0A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  errorIconText: {
    color: '#DC2626',
    fontSize: 28,
    fontWeight: '800',
  },

  errorTitle: {
    color: '#991B1B',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },

  errorText: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 22,
  },

  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },

  // =====================================================
  // HEADER
  // =====================================================

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  headerContent: {
    flex: 1,
    paddingRight: 16,
  },

  headerBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 14,
    backgroundColor: '#1E293B',
  },

  headerDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },

  headerBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#2563EB',
  },

  eyebrow: {
    color: '#0284C7',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 7,
  },

  title: {
    color: '#F1F5F9',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 7,
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 650,
  },

  refreshButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },

  refreshButtonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.95 }],
  },

  refreshIcon: {
    color: '#0284C7',
    fontSize: 27,
    fontWeight: '500',
  },

  // =====================================================
  // RESUMO
  // =====================================================

  summaryGrid: {
    gap: 12,
    marginBottom: 16,
  },

  summaryGridDesktop: {
    flexDirection: 'row',
  },

  summaryCard: {
    flex: 1,
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 18,
  },

  summaryIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#082F49',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  summaryIconText: {
    color: '#0284C7',
    fontSize: 19,
    fontWeight: '800',
  },

  summaryLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 3,
  },

  summaryValue: {
    color: '#F1F5F9',
    fontSize: 22,
    fontWeight: '800',
  },

  summaryValueSmall: {
    color: '#F1F5F9',
    fontSize: 18,
    fontWeight: '800',
  },

  // =====================================================
  // MLFLOW
  // =====================================================

  mlflowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },

  mlflowIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  mlflowIconText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  mlflowContent: {
    flex: 1,
  },

  mlflowTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },

  mlflowDescription: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
  },

  mlflowAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 11,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginLeft: 12,
  },

  mlflowActionPressed: {
    opacity: 0.7,
  },

  mlflowActionText: {
    color: '#0284C7',
    fontSize: 13,
    fontWeight: '800',
  },

  mlflowArrow: {
    color: '#0284C7',
    fontSize: 17,
    marginLeft: 6,
  },

  // =====================================================
  // LISTA
  // =====================================================

  listHeader: {
    marginBottom: 13,
  },

  sectionTitle: {
    color: '#F1F5F9',
    fontSize: 19,
    fontWeight: '800',
  },

  sectionSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 4,
  },

  list: {
    gap: 14,
  },

  listDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // =====================================================
  // CARD
  // =====================================================

  card: {
    width: '100%',
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 9,
    elevation: 2,
  },

  cardDesktop: {
    width: '48.8%',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  modelIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },

  modelNumber: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#172554',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  modelNumberText: {
    color: '#0284C7',
    fontSize: 13,
    fontWeight: '800',
  },

  modelTitleContainer: {
    flex: 1,
  },

  modelName: {
    color: '#F1F5F9',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 3,
  },

  modelType: {
    color: '#94A3B8',
    fontSize: 12,
  },

  // =====================================================
  // STATUS
  // =====================================================

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusReady: {
    backgroundColor: '#052E16',
  },

  statusProcessing: {
    backgroundColor: '#431407',
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },

  statusDotReady: {
    backgroundColor: '#16A34A',
  },

  statusDotProcessing: {
    backgroundColor: '#EA580C',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },

  statusTextReady: {
    color: '#15803D',
  },

  statusTextProcessing: {
    color: '#C2410C',
  },

  // =====================================================
  // IDENTIFICADORES
  // =====================================================

  identifiers: {
    backgroundColor: '#0B1220',
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 4,
    marginBottom: 17,
  },

  infoRow: {
    paddingVertical: 9,
  },

  label: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 4,
  },

  value: {
    color: '#CBD5E1',
    fontSize: 12,
    fontFamily: 'monospace',
  },

  // =====================================================
  // MÉTRICAS
  // =====================================================

  metricsHeader: {
    marginBottom: 10,
  },

  metricsTitle: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
  },

  metrics: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },

  metric: {
    flex: 1,
    alignItems: 'center',
  },

  metricDivider: {
    width: 1,
    height: 38,
    backgroundColor: '#E2E8F0',
  },

  metricLabel: {
    color: '#94A3B8',
    fontSize: 11,
    marginBottom: 5,
  },

  metricValue: {
    color: '#F1F5F9',
    fontSize: 18,
    fontWeight: '800',
  },

  // =====================================================
  // EMPTY
  // =====================================================

  emptyCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 40,
    alignItems: 'center',
  },

  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  emptyIconText: {
    color: '#94A3B8',
    fontSize: 26,
  },

  emptyTitle: {
    color: '#F1F5F9',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 7,
  },

  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 400,
    marginBottom: 20,
  },

  emptyButton: {
    backgroundColor: '#0284C7',
    borderRadius: 11,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },

  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  // =====================================================
  // FOOTER
  // =====================================================

  footer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    marginTop: 35,
    paddingTop: 22,
    paddingBottom: 10,
  },

  footerTitle: {
    color: '#0284C7',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },

  footerText: {
    color: '#94A3B8',
    fontSize: 11,
    textAlign: 'center',
  },
  }),
};

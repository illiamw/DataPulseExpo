import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
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
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =====================================================
  // BUSCAR MODELOS
  // =====================================================

  const carregarModelos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Erro HTTP ${response.status}`
        );
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
  // CARREGAR AO ABRIR A PÁGINA
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
      console.error(
        'Erro ao abrir MLflow:',
        err
      );
    }
  };

  // =====================================================
  // FORMATAR MÉTRICA
  // =====================================================

  const formatarMetrica = (
    value: number | null
  ) => {
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
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Carregando modelos...
        </Text>
      </View>
    );
  }

  // =====================================================
  // ERRO
  // =====================================================

  if (error) {
    return (
      <View style={styles.center}>

        <Text style={styles.errorTitle}>
          Erro ao carregar modelos
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
    );
  }

  // =====================================================
  // TELA
  // =====================================================

  return (
    <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >

      {/* ================================================= */}
      {/* CABEÇALHO */}
      {/* ================================================= */}

      <View style={styles.header}>

        <View>
          <Text style={styles.title}>
            Modelos experimentados
          </Text>

          <Text style={styles.subtitle}>
            {models.length} modelo(s) encontrado(s)
          </Text>
        </View>

        <Pressable
          style={styles.refreshButton}
          onPress={carregarModelos}
        >
          <Text style={styles.refreshText}>
            ↻
          </Text>
        </Pressable>

      </View>

      {/* ================================================= */}
      {/* BOTÃO MLFLOW */}
      {/* ================================================= */}

      <View style={styles.mlflowButton}>
        <ButtonCustom
          title="Ver experimentos no MLflow"
          onPress={abrirExperimentos}
        />
      </View>

      {/* ================================================= */}
      {/* LISTA */}
      {/* ================================================= */}

      {models.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyTitle}>
            Nenhum modelo encontrado
          </Text>

          <Text style={styles.emptyText}>
            Execute um experimento para que os
            modelos apareçam nesta lista.
          </Text>

        </View>

      ) : (

        <View style={styles.list}>

          {models.map((model, index) => (

            <View
              key={model.model_id}
              style={styles.card}
            >

              {/* ========================================= */}
              {/* MODELO */}
              {/* ========================================= */}

              <View style={styles.cardHeader}>

                <View style={styles.modelTitleContainer}>

                  <Text style={styles.modelNumber}>
                    #{index + 1}
                  </Text>

                  <Text style={styles.modelName}>
                    {model.run_name}
                  </Text>

                </View>

                <View style={styles.status}>
                  <Text style={styles.statusText}>
                    {model.status}
                  </Text>
                </View>

              </View>

              {/* ========================================= */}
              {/* ID */}
              {/* ========================================= */}

              <View style={styles.infoRow}>

                <Text style={styles.label}>
                  Model ID
                </Text>

                <Text
                  style={styles.value}
                  numberOfLines={1}
                >
                  {model.model_id}
                </Text>

              </View>

              {/* ========================================= */}
              {/* RUN */}
              {/* ========================================= */}

              <View style={styles.infoRow}>

                <Text style={styles.label}>
                  Run ID
                </Text>

                <Text
                  style={styles.value}
                  numberOfLines={1}
                >
                  {model.run_id}
                </Text>

              </View>

              {/* ========================================= */}
              {/* MÉTRICAS */}
              {/* ========================================= */}

              <View style={styles.metrics}>

                <View style={styles.metric}>

                  <Text style={styles.metricLabel}>
                    Accuracy
                  </Text>

                  <Text style={styles.metricValue}>
                    {formatarMetrica(
                      model.accuracy
                    )}
                  </Text>

                </View>

                <View style={styles.metric}>

                  <Text style={styles.metricLabel}>
                    Precision
                  </Text>

                  <Text style={styles.metricValue}>
                    {formatarMetrica(
                      model.precision
                    )}
                  </Text>

                </View>

                <View style={styles.metric}>

                  <Text style={styles.metricLabel}>
                    F1
                  </Text>

                  <Text style={styles.metricValue}>
                    {formatarMetrica(
                      model.f1
                    )}
                  </Text>

                </View>

              </View>

            </View>

          ))}

        </View>

      )}

    </ScrollView>
  );
}

// =======================================================
// ESTILOS
// =======================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  content: {
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
    padding: 24,
    paddingBottom: 60,
    paddingTop: 120
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#0f172a',
  },

  loadingText: {
    marginTop: 15,
    color: '#cbd5e1',
    fontSize: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
  },

  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 5,
  },

  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
  },

  refreshText: {
    color: '#ffffff',
    fontSize: 25,
  },

  mlflowButton: {
    marginBottom: 25,
  },

  list: {
    gap: 15,
  },

  card: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#334155',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  modelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  modelNumber: {
    color: '#94a3b8',
    fontSize: 14,
    marginRight: 10,
  },

  modelName: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '700',
    flexShrink: 1,
  },

  status: {
    backgroundColor: '#14532d',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 10,
  },

  statusText: {
    color: '#86efac',
    fontSize: 11,
    fontWeight: '700',
  },

  infoRow: {
    marginBottom: 12,
  },

  label: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 3,
  },

  value: {
    color: '#e2e8f0',
    fontSize: 13,
  },

  metrics: {
    flexDirection: 'row',
    marginTop: 8,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },

  metric: {
    flex: 1,
    alignItems: 'center',
  },

  metricLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 5,
  },

  metricValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },

  emptyTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

  emptyText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 400,
  },

  errorTitle: {
    color: '#f87171',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },

  errorText: {
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 20,
  },

  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },

});
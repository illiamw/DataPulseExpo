import React, { useState } from 'react';

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';

import TextInputCustom from '@/components/ui/TextInputCustom';
import ButtonCustom from '@/components/ui/ButtonCustom';

const URL_FAST_API = 'http://163.176.161.159:8000/experiment';

type ModelName =
  | 'GaussianNB'
  | 'KNN'
  | 'SVM'
  | 'GradientBoosting'
  | 'RandomForest'
  | 'LogisticRegression'
  | 'DecisionTree'
  | 'XGBoost';

type ParameterType = 'number' | 'string';

interface ParameterConfig {
  name: string;
  type: ParameterType;
  defaultValue: string;
}

interface ModelConfig {
  apiModel: string;
  parameters: ParameterConfig[];
}

const MODELS: Record<ModelName, ModelConfig> = {
  GaussianNB: {
    apiModel: 'GaussianNB',
    parameters: [],
  },

  KNN: {
    apiModel: 'KNeighborsClassifier',
    parameters: [
      {
        name: 'n_neighbors',
        type: 'number',
        defaultValue: '5',
      },
      {
        name: 'weights',
        type: 'string',
        defaultValue: 'distance',
      },
    ],
  },

  SVM: {
    apiModel: 'SVC',
    parameters: [
      {
        name: 'C',
        type: 'number',
        defaultValue: '1.0',
      },
      {
        name: 'kernel',
        type: 'string',
        defaultValue: 'rbf',
      },
      {
        name: 'probability',
        type: 'string',
        defaultValue: 'true',
      },
      {
        name: 'random_state',
        type: 'number',
        defaultValue: '42',
      },
    ],
  },

  GradientBoosting: {
    apiModel: 'GradientBoostingClassifier',
    parameters: [
      {
        name: 'n_estimators',
        type: 'number',
        defaultValue: '200',
      },
      {
        name: 'learning_rate',
        type: 'number',
        defaultValue: '0.05',
      },
      {
        name: 'max_depth',
        type: 'number',
        defaultValue: '5',
      },
      {
        name: 'random_state',
        type: 'number',
        defaultValue: '42',
      },
    ],
  },

  RandomForest: {
    apiModel: 'RandomForestClassifier',
    parameters: [
      {
        name: 'n_estimators',
        type: 'number',
        defaultValue: '300',
      },
      {
        name: 'max_depth',
        type: 'number',
        defaultValue: '10',
      },
      {
        name: 'min_samples_split',
        type: 'number',
        defaultValue: '10',
      },
      {
        name: 'random_state',
        type: 'number',
        defaultValue: '42',
      },
      {
        name: 'n_jobs',
        type: 'number',
        defaultValue: '-1',
      },
    ],
  },

  LogisticRegression: {
    apiModel: 'LogisticRegression',
    parameters: [
      {
        name: 'max_iter',
        type: 'number',
        defaultValue: '10000',
      },
      {
        name: 'C',
        type: 'number',
        defaultValue: '1.0',
      },
    ],
  },

  DecisionTree: {
    apiModel: 'DecisionTreeClassifier',
    parameters: [
      {
        name: 'max_depth',
        type: 'number',
        defaultValue: '5',
      },
      {
        name: 'min_samples_split',
        type: 'number',
        defaultValue: '10',
      },
      {
        name: 'random_state',
        type: 'number',
        defaultValue: '42',
      },
    ],
  },

  XGBoost: {
    apiModel: 'XGBClassifier',
    parameters: [
      {
        name: 'n_estimators',
        type: 'number',
        defaultValue: '300',
      },
      {
        name: 'learning_rate',
        type: 'number',
        defaultValue: '0.1',
      },
      {
        name: 'max_depth',
        type: 'number',
        defaultValue: '6',
      },
      {
        name: 'random_state',
        type: 'number',
        defaultValue: '42',
      },
      {
        name: 'n_jobs',
        type: 'number',
        defaultValue: '-1',
      },
      {
        name: 'eval_metric',
        type: 'string',
        defaultValue: 'logloss',
      },
    ],
  },
};

const MODEL_NAMES = Object.keys(MODELS) as ModelName[];

export default function TreinoModelo() {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 768;

  const [selectedModel, setSelectedModel] =
    useState<ModelName>('XGBoost');

  const [parameters, setParameters] = useState<Record<string, string>>(
    () => getDefaultParameters('XGBoost')
  );

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [responseText, setResponseText] = useState<any>(null);

  function getDefaultParameters(model: ModelName) {
    const config = MODELS[model];

    const defaults: Record<string, string> = {};

    config.parameters.forEach((parameter) => {
      defaults[parameter.name] = parameter.defaultValue;
    });

    return defaults;
  }

  function handleSelectModel(model: ModelName) {
    setSelectedModel(model);
    setParameters(getDefaultParameters(model));
    setResult(null);
    setResponseText(null);
  }

  function handleParameterChange(
    parameterName: string,
    value: string
  ) {
    setParameters((previous) => ({
      ...previous,
      [parameterName]: value,
    }));
  }

  function convertValue(
    value: string,
    type: ParameterType
  ): number | string | boolean {
    if (type === 'number') {
      const numberValue = Number(value);

      return Number.isNaN(numberValue) ? 0 : numberValue;
    }

    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    return value;
  }

  function buildPayload() {
    const modelConfig = MODELS[selectedModel];

    const formattedParameters: Record<
      string,
      number | string | boolean
    > = {};

    modelConfig.parameters.forEach((parameter) => {
      formattedParameters[parameter.name] = convertValue(
        parameters[parameter.name],
        parameter.type
      );
    });

    return {
      [`${selectedModel}_custon`]: {
        model: modelConfig.apiModel,
        parameters: formattedParameters,
      },
    };
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      setResult(null);
      setResponseText(null);

      const payload = buildPayload();

      console.log(
        'Payload enviado:',
        JSON.stringify(payload, null, 2)
      );

      const response = await fetch(URL_FAST_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseTextoConsult = await response.text();

      let responseData: any;

      try {
        responseData = JSON.parse(responseTextoConsult);
      } catch {
        responseData = responseTextoConsult;
      }

      if (!response.ok) {
        setResponseText(responseTextoConsult);

        throw new Error(
          `Erro ${response.status}: ${responseTextoConsult}`
        );
      }

      setResult(responseData);

      Alert.alert(
        'Experimento enviado',
        'O experimento foi enviado com sucesso.'
      );
    } catch (error: any) {
      setResponseText(
        'Erro ao enviar experimento: ' + error
      );

      console.log(
        'Erro ao enviar experimento:',
        error
      );

      Alert.alert(
        'Erro',
        error?.message ||
          'Não foi possível enviar o experimento.'
      );
    } finally {
      setLoading(false);
    }
  }

  function renderParameters() {
    const modelConfig = MODELS[selectedModel];

    if (modelConfig.parameters.length === 0) {
      return (
        <View style={styles.emptyParameters}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyIconText}>✓</Text>
          </View>

          <View style={styles.emptyContent}>
            <Text style={styles.emptyTitle}>
              Sem parâmetros personalizados
            </Text>

            <Text style={styles.emptyText}>
              Este modelo utiliza apenas suas configurações
              padrão para o treinamento.
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>
              Parâmetros
            </Text>

            <Text style={styles.cardSubtitle}>
              Configure os hiperparâmetros do modelo
            </Text>
          </View>

          <View style={styles.parameterCount}>
            <Text style={styles.parameterCountText}>
              {modelConfig.parameters.length}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.parametersGrid,
            isDesktop && styles.parametersGridDesktop,
          ]}
        >
          {modelConfig.parameters.map((parameter) => (
            <View
              key={parameter.name}
              style={[
                styles.parameterContainer,
                isDesktop && styles.parameterDesktop,
              ]}
            >
              <Text style={styles.label}>
                {parameter.name}
              </Text>

              <TextInputCustom
                value={
                  parameters[parameter.name] ?? ''
                }
                onChangeText={(value: string) =>
                  handleParameterChange(
                    parameter.name,
                    value
                  )
                }
                placeholder={parameter.defaultValue}
              />

              <Text style={styles.defaultValue}>
                Padrão: {parameter.defaultValue}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        isDesktop && styles.contentDesktop,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <View style={styles.headerDot} />

          <Text style={styles.headerBadgeText}>
            MLOps
          </Text>
        </View>

        <Text style={styles.title}>
          Treinar modelo
        </Text>

        <Text style={styles.description}>
          Configure um algoritmo de machine learning e
          execute um novo experimento no DataPulse.
        </Text>
      </View>

      {/* MODELO */}

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>
              Selecionar modelo
            </Text>

            <Text style={styles.cardSubtitle}>
              Escolha o algoritmo para o experimento
            </Text>
          </View>
        </View>

        <View style={styles.modelsContainer}>
          {MODEL_NAMES.map((model) => {
            const selected =
              selectedModel === model;

            return (
              <Pressable
                key={model}
                onPress={() =>
                  handleSelectModel(model)
                }
                style={({ pressed }) => [
                  styles.modelButton,
                  selected &&
                    styles.modelButtonSelected,
                  pressed &&
                    styles.modelButtonPressed,
                ]}
              >
                <View
                  style={[
                    styles.modelIndicator,
                    selected &&
                      styles.modelIndicatorSelected,
                  ]}
                />

                <Text
                  numberOfLines={1}
                  style={[
                    styles.modelButtonText,
                    selected &&
                      styles.modelButtonTextSelected,
                  ]}
                >
                  {model}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* MODELO ATUAL */}

      <View style={styles.selectedModelContainer}>
        <View style={styles.selectedModelIcon}>
          <Text style={styles.selectedModelIconText}>
            ML
          </Text>
        </View>

        <View style={styles.selectedModelInfo}>
          <Text style={styles.selectedModelLabel}>
            MODELO SELECIONADO
          </Text>

          <Text style={styles.selectedModel}>
            {selectedModel}
          </Text>

          <Text style={styles.selectedModelApi}>
            {MODELS[selectedModel].apiModel}
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />

          <Text style={styles.statusText}>
            Configurável
          </Text>
        </View>
      </View>

      {/* PARÂMETROS */}

      {renderParameters()}

      {/* AÇÃO */}

      <View style={styles.actionCard}>
        <View style={styles.actionInfo}>
          <Text style={styles.actionTitle}>
            Pronto para executar?
          </Text>

          <Text style={styles.actionDescription}>
            O experimento será enviado para o pipeline
            de treinamento.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCustom
            title={
              loading
                ? 'Executando experimento...'
                : 'Executar experimento'
            }
            onPress={handleSubmit}
            disabled={loading}
          />
        </View>
      </View>

      {/* LOADING */}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />

          <View>
            <Text style={styles.loadingTitle}>
              Executando experimento
            </Text>

            <Text style={styles.loadingText}>
              Aguarde enquanto o modelo é treinado...
            </Text>
          </View>
        </View>
      )}

      {/* RESULTADO */}

      {result !== null && (
        <View style={styles.resultContainer}>
          <View style={styles.resultHeader}>
            <View>
              <Text style={styles.resultTitle}>
                Experimento concluído
              </Text>

              <Text style={styles.resultSubtitle}>
                Resposta retornada pela API
              </Text>
            </View>

            <View style={styles.successBadge}>
              <Text style={styles.successBadgeText}>
                SUCESSO
              </Text>
            </View>
          </View>

          <View style={styles.resultCode}>
            <Text style={styles.resultText}>
              {JSON.stringify(result, null, 2)}
            </Text>
          </View>
        </View>
      )}

      {/* ERRO */}

      {responseText != null && (
        <View style={styles.errorContainer}>
          <View style={styles.errorIcon}>
            <Text style={styles.errorIconText}>
              !
            </Text>
          </View>

          <View style={styles.errorContent}>
            <Text style={styles.errorTitle}>
              Erro no experimento
            </Text>

            <Text style={styles.errorText}>
              {responseText}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 70,
  },

  contentDesktop: {
    paddingHorizontal: 32,
    paddingTop: 110,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    marginBottom: 30,
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
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#2563EB',
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    marginBottom: 8,
  },

  description: {
    maxWidth: 680,
    fontSize: 15,
    lineHeight: 23,
    opacity: 0.62,
  },

  /* =========================
     CARD
  ========================= */

  card: {
    borderWidth: 1,
    borderColor: '#E3E7ED',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },

  cardSubtitle: {
    fontSize: 13,
    marginTop: 4,
    opacity: 0.55,
  },

  /* =========================
     MODELOS
  ========================= */

  modelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },

  modelButton: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#DDE2E8',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FAFBFC',
  },

  modelButtonSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },

  modelButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  modelIndicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#C5CBD3',
  },

  modelIndicatorSelected: {
    backgroundColor: '#2563EB',
  },

  modelButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },

  modelButtonTextSelected: {
    color: '#1D4ED8',
  },

  /* =========================
     MODELO SELECIONADO
  ========================= */

  selectedModelContainer: {
    minHeight: 90,
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9E5F7',
    backgroundColor: '#F5F9FF',
  },

  selectedModelIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: '#2563EB',
  },

  selectedModelIconText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  selectedModelInfo: {
    flex: 1,
  },

  selectedModelLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#64748B',
    marginBottom: 3,
  },

  selectedModel: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172033',
  },

  selectedModelApi: {
    fontSize: 11,
    marginTop: 3,
    color: '#64748B',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E8F7EF',
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },

  /* =========================
     PARÂMETROS
  ========================= */

  parametersGrid: {
    gap: 16,
  },

  parametersGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  parameterContainer: {
    marginBottom: 2,
  },

  parameterDesktop: {
    width: '31.8%',
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
    color: '#374151',
  },

  defaultValue: {
    fontSize: 10,
    marginTop: 5,
    color: '#8A94A3',
  },

  parameterCount: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
  },

  parameterCountText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },

  /* =========================
     SEM PARÂMETROS
  ========================= */

  emptyParameters: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E3E7ED',
    backgroundColor: '#FFFFFF',
  },

  emptyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#E8F7EF',
  },

  emptyIconText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#16A34A',
  },

  emptyContent: {
    flex: 1,
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },

  emptyText: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.55,
  },

  /* =========================
     AÇÃO
  ========================= */

  actionCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E3E7ED',
    backgroundColor: '#FFFFFF',
  },

  actionInfo: {
    marginBottom: 18,
  },

  actionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 5,
  },

  actionDescription: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.55,
  },

  buttonContainer: {
    marginTop: 2,
  },

  /* =========================
     LOADING
  ========================= */

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#DDE5F2',
    backgroundColor: '#F7FAFF',
  },

  loadingTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },

  loadingText: {
    fontSize: 11,
    opacity: 0.55,
  },

  /* =========================
     RESULTADO
  ========================= */

  resultContainer: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#D9E5F7',
    backgroundColor: '#F8FAFD',
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  resultTitle: {
    fontSize: 17,
    fontWeight: '800',
  },

  resultSubtitle: {
    fontSize: 12,
    marginTop: 3,
    opacity: 0.55,
  },

  successBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#DCFCE7',
  },

  successBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#15803D',
  },

  resultCode: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#111827',
    overflow: 'hidden',
  },

  resultText: {
    fontFamily: 'monospace',
    fontSize: 11,
    lineHeight: 17,
    color: '#E5E7EB',
  },

  /* =========================
     ERRO
  ========================= */

  errorContainer: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },

  errorIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
    backgroundColor: '#FEE2E2',
  },

  errorIconText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#DC2626',
  },

  errorContent: {
    flex: 1,
  },

  errorTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#991B1B',
    marginBottom: 5,
  },

  errorText: {
    fontSize: 11,
    lineHeight: 17,
    color: '#B91C1C',
  },
});                       

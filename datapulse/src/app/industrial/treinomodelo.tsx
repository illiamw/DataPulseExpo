import React, { useState } from 'react';

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import TextInputCustom from '@/components/ui/TextInputCustom';
import ButtonCustom from '@/components/ui/ButtonCustom';

const URL_FAST_API = 'http://163.176.161.159:8000/experiment'

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

      const payload = buildPayload();

      console.log(
        'Payload enviado:',
        JSON.stringify(payload, null, 2)
      );

      const response = await fetch(
        URL_FAST_API,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const responseTextoConsult = await response.text();
      

      let responseData: any;

      try {
        responseData = JSON.parse(responseTextoConsult);
      } catch {
        responseData = responseTextoConsult;
      }

      if (!response.ok) {
        setResponseText(responseTextoConsult)
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
      setResponseText('Erro ao enviar experimento:' + error);
      console.log('Erro ao enviar experimento:', error);

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
        <View style={styles.noParameters}>
          <Text style={styles.noParametersText}>
            Este modelo não possui parâmetros personalizados.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.parametersContainer}>
        <Text style={styles.sectionTitle}>
          Parâmetros do modelo
        </Text>

        {modelConfig.parameters.map((parameter) => (
          <View
            key={parameter.name}
            style={styles.parameterContainer}
          >
            <Text style={styles.label}>
              {parameter.name}
            </Text>

            <TextInputCustom
              value={parameters[parameter.name] ?? ''}
              onChangeText={(value: string) =>
                handleParameterChange(
                  parameter.name,
                  value
                )
              }
              placeholder={parameter.defaultValue}
            />
          </View>
        ))}
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        Treinar modelo
      </Text>

      <Text style={styles.description}>
        Selecione o algoritmo e configure seus parâmetros
        para executar um novo experimento.
      </Text>

      <Text style={styles.sectionTitle}>
        Selecionar modelo
      </Text>

      <View style={styles.modelsContainer}>
        {MODEL_NAMES.map((model) => {
          const selected = selectedModel === model;

          return (
            <Pressable
              key={model}
              onPress={() => handleSelectModel(model)}
              style={[
                styles.modelButton,
                selected && styles.modelButtonSelected,
              ]}
            >
              <Text
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

      <View style={styles.selectedModelContainer}>
        <Text style={styles.selectedModelLabel}>
          Modelo selecionado
        </Text>

        <Text style={styles.selectedModel}>
          {selectedModel}
        </Text>
      </View>

      {renderParameters()}

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

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Enviando experimento...
          </Text>
        </View>
      )}

      {result !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.sectionTitle}>
            Resultado
          </Text>

          <Text style={styles.resultText}>
            {JSON.stringify(result, null, 2)}
          </Text>
        </View>
      )}
      {responseText != null && (<View style={styles.error}>
          <Text style={styles.errorText}>
            {responseText}
          </Text>
        </View>)}
    </ScrollView>
  );
}

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

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28,
    opacity: 0.7,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },

  modelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },

  modelButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 140,
    alignItems: 'center',
  },

  modelButtonSelected: {
    backgroundColor: '#222',
  },

  modelButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },

  modelButtonTextSelected: {
    color: '#fff',
  },

  selectedModelContainer: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    backgroundColor: '#eee',
  },

  selectedModelLabel: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 4,
  },

  selectedModel: {
    fontSize: 18,
    fontWeight: '700',
  },

  parametersContainer: {
    marginBottom: 24,
  },

  parameterContainer: {
    marginBottom: 16,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },

  noParameters: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: '#eee',
  },

  noParametersText: {
    fontSize: 15,
    opacity: 0.7,
  },
  error: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: '#974343',
  },

  errorText: {
    fontSize: 15,
    opacity: 0.7,
  },


  buttonContainer: {
    marginTop: 8,
  },

  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  loadingText: {
    marginTop: 10,
    opacity: 0.7,
  },

  resultContainer: {
    marginTop: 30,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#eee',
  },

  resultText: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
});
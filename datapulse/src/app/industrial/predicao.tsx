import React, { useEffect, useState } from 'react';

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  useWindowDimensions,
  useColorScheme
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import TextInputCustom from '@/components/ui/TextInputCustom';
import ButtonCustom from '@/components/ui/ButtonCustom';

type InputType =
  | 'text'
  | 'number'
  | 'date'
  | 'select';

interface RenderInputOptions {
  min?: number;
  max?: number;
  options?: string[];
}

const URL_MODELS =
  'http://163.176.161.159:8000/models';

const URL_PREDICT =
  'http://163.176.161.159:8000/predict';

interface Model {
  model_id: string;
  model_name: string;
  run_id: string;
  run_name: string;
  status: string;
  accuracy: number;
  precision: number;
  f1: number;
}

interface ModelsResponse {
  total: number;
  models: Model[];
}

interface PredictionData {
  registro_id: string;
  data_registro: string;
  linha_producao: string;
  turno: string;
  maquina: string;
  idade_maquina_anos: string;
  temperatura_valor: string;
  unidade_temperatura: string;
  pressao_valor: string;
  unidade_pressao: string;
  vibracao_motor_mm_s: string;
  velocidade_esteira_m_min: string;
  umidade_pct: string;
  tamanho_lote: string;
  tempo_setup_min: string;
  paradas_nao_planejadas: string;
  taxa_defeitos_pct: string;
  energia_sensor_b_kwh: string;
  codigo_campanha: string;
  ruido_aleatorio: string;
  consumo_energia_kwh: string;
  falha_24h: string;
}

const INITIAL_DATA: PredictionData = {
  registro_id: 'REG-00000',
  data_registro: '2025-01-01 00:00:00',
  linha_producao: 'L-C',
  turno: 'manha',
  maquina: 'M05',
  idade_maquina_anos: '100',
  temperatura_valor: '764.04',
  unidade_temperatura: 'C',
  pressao_valor: '5.925',
  unidade_pressao: 'bar',
  vibracao_motor_mm_s: '2.826',
  velocidade_esteira_m_min: '42.87',
  umidade_pct: '60.76',
  tamanho_lote: '1958',
  tempo_setup_min: '34.68',
  paradas_nao_planejadas: '3',
  taxa_defeitos_pct: '2.044',
  energia_sensor_b_kwh: '550.54',
  codigo_campanha: 'C99',
  ruido_aleatorio: '-1.0691204379907002',
  consumo_energia_kwh: '1000',
  falha_24h: '1',
};

export default function PredicaoModelo() {

  const colorScheme = useColorScheme();
  
    const styles =
      colorScheme === 'dark'
        ? themeStyles.dark
        : themeStyles.light;

  const { width } = useWindowDimensions();

  const isDesktop = width >= 768;

  const [models, setModels] =
    useState<Model[]>([]);

  const [selectedModel, setSelectedModel] =
    useState<Model | null>(null);

  const [data, setData] =
    useState<PredictionData>(INITIAL_DATA);

  const [loadingModels, setLoadingModels] =
    useState(false);

  const [loadingPrediction, setLoadingPrediction] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  const [responseText, setResponseText] =
    useState<any>(null);

  useEffect(() => {
    loadModels();
  }, []);

  async function loadModels() {
    try {
      setLoadingModels(true);
      setResponseText(null);

      const response =
        await fetch(URL_MODELS);

      const responseText =
        await response.text();

      let responseData: ModelsResponse;

      try {
        responseData =
          JSON.parse(responseText);
      } catch {
        throw new Error(
          `Resposta inválida da API de modelos: ${responseText}`
        );
      }

      if (!response.ok) {
        throw new Error(
          `Erro ${response.status}: ${responseText}`
        );
      }

      setModels(responseData.models);

      if (responseData.models.length > 0) {
        setSelectedModel(
          responseData.models[0]
        );
      }
    } catch (error: any) {
      console.log(
        'Erro ao carregar modelos:',
        error
      );

      setResponseText(
        'Erro ao carregar modelos: ' +
          error?.message
      );

      Alert.alert(
        'Erro',
        error?.message ||
          'Não foi possível carregar os modelos.'
      );
    } finally {
      setLoadingModels(false);
    }
  }

  function handleSelectModel(model: Model) {
    setSelectedModel(model);
    setResult(null);
    setResponseText(null);
  }

  function handleChange(
    field: keyof PredictionData,
    value: string
  ) {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function numberValue(value: string) {
    const number = Number(value);

    return Number.isNaN(number)
      ? 0
      : number;
  }

  function buildPayload() {
    if (!selectedModel) {
      throw new Error(
        'Nenhum modelo selecionado.'
      );
    }

    return {
      model: {
        model_run:
          selectedModel.model_id,
      },

      data: {
        registro_id:
          data.registro_id,

        data_registro:
          data.data_registro,

        linha_producao:
          data.linha_producao,

        turno:
          data.turno,

        maquina:
          data.maquina,

        idade_maquina_anos:
          numberValue(
            data.idade_maquina_anos
          ),

        temperatura_valor:
          numberValue(
            data.temperatura_valor
          ),

        unidade_temperatura:
          data.unidade_temperatura,

        pressao_valor:
          numberValue(
            data.pressao_valor
          ),

        unidade_pressao:
          data.unidade_pressao,

        vibracao_motor_mm_s:
          numberValue(
            data.vibracao_motor_mm_s
          ),

        velocidade_esteira_m_min:
          numberValue(
            data.velocidade_esteira_m_min
          ),

        umidade_pct:
          numberValue(
            data.umidade_pct
          ),

        tamanho_lote:
          numberValue(
            data.tamanho_lote
          ),

        tempo_setup_min:
          numberValue(
            data.tempo_setup_min
          ),

        paradas_nao_planejadas:
          numberValue(
            data.paradas_nao_planejadas
          ),

        taxa_defeitos_pct:
          numberValue(
            data.taxa_defeitos_pct
          ),

        energia_sensor_b_kwh:
          numberValue(
            data.energia_sensor_b_kwh
          ),

        codigo_campanha:
          data.codigo_campanha,

        ruido_aleatorio:
          numberValue(
            data.ruido_aleatorio
          ),

        consumo_energia_kwh:
          numberValue(
            data.consumo_energia_kwh
          ),

        falha_24h:
          numberValue(
            data.falha_24h
          ),
      },
    };
  }

  async function handleSubmit() {
    try {
      if (!selectedModel) {
        Alert.alert(
          'Modelo',
          'Selecione um modelo antes de realizar a predição.'
        );

        return;
      }

      setLoadingPrediction(true);
      setResult(null);
      setResponseText(null);

      const payload =
        buildPayload();

      console.log(
        'Payload enviado:',
        JSON.stringify(
          payload,
          null,
          2
        )
      );

      const response =
        await fetch(URL_PREDICT, {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body:
            JSON.stringify(payload),
        });

      const responseText =
        await response.text();

      let responseData: any;

      try {
        responseData =
          JSON.parse(responseText);
      } catch {
        responseData =
          responseText;
      }

      if (!response.ok) {
        setResponseText(
          responseText
        );

        throw new Error(
          `Erro ${response.status}: ${responseText}`
        );
      }

      setResult(responseData);

      Alert.alert(
        'Predição realizada',
        'A predição foi realizada com sucesso.'
      );
    } catch (error: any) {
      console.log(
        'Erro ao realizar predição:',
        error
      );

      setResponseText(
        'Erro ao realizar predição: ' +
          error?.message
      );

      Alert.alert(
        'Erro',
        error?.message ||
          'Não foi possível realizar a predição.'
      );
    } finally {
      setLoadingPrediction(false);
    }
  }

  function parseDateTime(value: string) {
    const [
      datePart,
      timePart,
    ] = value.split(' ');

    const [
      year,
      month,
      day,
    ] = datePart
      .split('-')
      .map(Number);

    const [
      hours,
      minutes,
      seconds,
    ] = timePart
      .split(':')
      .map(Number);

    return new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      seconds
    );
  }

  function renderInput(
    label: string,
    field: keyof PredictionData,
    placeholder?: string,
    type: InputType = 'text',
    options?: RenderInputOptions
  ) {
    const {
      min,
      max,
      options: selectOptions,
    } = options ?? {};

    function handleNumberChange(
      value: string
    ) {
      if (value === '') {
        handleChange(field, value);
        return;
      }

      const numericValue =
        Number(value);

      if (Number.isNaN(numericValue)) {
        return;
      }

      if (
        max !== undefined &&
        numericValue > max
      ) {
        handleChange(
          field,
          String(max)
        );

        return;
      }

      if (
        min !== undefined &&
        numericValue < min
      ) {
        handleChange(
          field,
          String(min)
        );

        return;
      }

      handleChange(
        field,
        value
      );
    }

    if (type === 'select') {
      return (
        <View
          style={[
            styles.parameterContainer,
            isDesktop &&
              styles.parameterDesktop,
          ]}
        >
          <Text style={styles.label}>
            {label}
          </Text>

          <View style={styles.selectContainer}>
            {selectOptions?.map(
              (option) => {
                const selected =
                  data[field] ===
                  option;

                return (
                  <Pressable
                    key={option}
                    onPress={() =>
                      handleChange(
                        field,
                        option
                      )
                    }
                    style={[
                      styles.selectOption,
                      selected &&
                        styles.selectOptionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.selectOptionText,
                        selected &&
                          styles.selectOptionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              }
            )}
          </View>
        </View>
      );
    }

    if (type === 'date') {
      const currentDate =
        parseDateTime(
          data[field]
        );

      return (
        <View
          style={[
            styles.parameterContainer,
            isDesktop &&
              styles.parameterDesktop,
          ]}
        >
          <Text style={styles.label}>
            {label}
          </Text>

          <View style={styles.datePickerContainer}>
            <DateTimePicker
              value={
                currentDate
              }
              mode="datetime"
              display="default"
              onChange={(
                event,
                selectedDate
              ) => {
                if (
                  selectedDate
                ) {
                  const year =
                    selectedDate.getFullYear();

                  const month =
                    String(
                      selectedDate.getMonth() +
                        1
                    ).padStart(
                      2,
                      '0'
                    );

                  const day =
                    String(
                      selectedDate.getDate()
                    ).padStart(
                      2,
                      '0'
                    );

                  const hours =
                    String(
                      selectedDate.getHours()
                    ).padStart(
                      2,
                      '0'
                    );

                  const minutes =
                    String(
                      selectedDate.getMinutes()
                    ).padStart(
                      2,
                      '0'
                    );

                  const seconds =
                    String(
                      selectedDate.getSeconds()
                    ).padStart(
                      2,
                      '0'
                    );

                  const formattedDate =
                    `${year}-${month}-${day} ` +
                    `${hours}:${minutes}:${seconds}`;

                  handleChange(
                    field,
                    formattedDate
                  );
                }
              }}
            />
          </View>

          <Text style={styles.dateValue}>
            {data[field]}
          </Text>
        </View>
      );
    }

    if (type === 'number') {
      return (
        <View
          style={[
            styles.parameterContainer,
            isDesktop &&
              styles.parameterDesktop,
          ]}
        >
          <Text style={styles.label}>
            {label}
          </Text>

          <TextInputCustom
            value={
              data[field]
            }
            onChangeText={
              handleNumberChange
            }
            placeholder={
              placeholder
            }
            keyboardType="numeric"
          />

          {(min !== undefined ||
            max !== undefined) && (
            <Text
              style={
                styles.rangeText
              }
            >
              {min !== undefined &&
                `Mínimo: ${min}`}

              {min !== undefined &&
                max !== undefined &&
                ' • '}

              {max !== undefined &&
                `Máximo: ${max}`}
            </Text>
          )}
        </View>
      );
    }

    return (
      <View
        style={[
          styles.parameterContainer,
          isDesktop &&
            styles.parameterDesktop,
        ]}
      >
        <Text style={styles.label}>
          {label}
        </Text>

        <TextInputCustom
          value={
            data[field]
          }
          onChangeText={(
            value: string
          ) =>
            handleChange(
              field,
              value
            )
          }
          placeholder={
            placeholder
          }
        />
      </View>
    );
  }

  const predictionIsFailure =
    result?.prediction ===
    'Falha';

  return (
    <ScrollView
      style={
        styles.container
      }
      contentContainerStyle={[
        styles.content,
        isDesktop &&
          styles.contentDesktop,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* HEADER */}

      <View style={styles.header}>
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
            PREDIÇÃO
          </Text>
        </View>

        <Text style={styles.title}>
          Realizar predição
        </Text>

        <Text
          style={
            styles.description
          }
        >
          Selecione um modelo treinado
          e informe as condições da
          máquina para estimar o risco
          de falha nas próximas 24 horas.
        </Text>
      </View>

      {/* MODELOS */}

      <View style={styles.card}>
        <View
          style={
            styles.cardHeader
          }
        >
          <View>
            <Text
              style={
                styles.cardTitle
              }
            >
              Modelo de predição
            </Text>

            <Text
              style={
                styles.cardSubtitle
              }
            >
              Selecione um modelo
              registrado no MLflow
            </Text>
          </View>

          {!loadingModels &&
            models.length > 0 && (
              <View
                style={
                  styles.countBadge
                }
              >
                <Text
                  style={
                    styles.countBadgeText
                  }
                >
                  {models.length}
                </Text>
              </View>
            )}
        </View>

        {loadingModels ? (
          <View
            style={
              styles.modelsLoading
            }
          >
            <ActivityIndicator
              size="small"
            />

            <Text
              style={
                styles.loadingText
              }
            >
              Carregando modelos...
            </Text>
          </View>
        ) : (
          <View
            style={
              styles.modelsContainer
            }
          >
            {models.map(
              (model) => {
                const selected =
                  selectedModel?.model_id ===
                  model.model_id;

                return (
                  <Pressable
                    key={
                      model.model_id
                    }
                    onPress={() =>
                      handleSelectModel(
                        model
                      )
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
                      numberOfLines={
                        1
                      }
                      style={[
                        styles.modelButtonText,
                        selected &&
                          styles.modelButtonTextSelected,
                      ]}
                    >
                      {
                        model.run_name
                      }
                    </Text>
                  </Pressable>
                );
              }
            )}
          </View>
        )}
      </View>

      {/* MODELO SELECIONADO */}

      {selectedModel && (
        <View
          style={
            styles.selectedModelContainer
          }
        >
          <View
            style={
              styles.selectedModelIcon
            }
          >
            <Text
              style={
                styles.selectedModelIconText
              }
            >
              ML
            </Text>
          </View>

          <View
            style={
              styles.selectedModelInfo
            }
          >
            <Text
              style={
                styles.selectedModelLabel
              }
            >
              MODELO SELECIONADO
            </Text>

            <Text
              style={
                styles.selectedModel
              }
            >
              {
                selectedModel.run_name
              }
            </Text>

            <Text
              style={
                styles.modelId
              }
            >
              ID: {selectedModel.model_id}
            </Text>
          </View>

          <View
            style={
              styles.metricsContainer
            }
          >
            <Metric
              label="Accuracy"
              value={
                selectedModel.accuracy
              }
            />

            <Metric
              label="Precision"
              value={
                selectedModel.precision
              }
            />

            <Metric
              label="F1"
              value={
                selectedModel.f1
              }
            />
          </View>
        </View>
      )}

      {/* DADOS DA MÁQUINA */}

      <View
        style={styles.card}
      >
        <View
          style={
            styles.cardHeader
          }
        >
          <View>
            <Text
              style={
                styles.cardTitle
              }
            >
              Dados da máquina
            </Text>

            <Text
              style={
                styles.cardSubtitle
              }
            >
              Informe as condições
              atuais do processo industrial
            </Text>
          </View>

          <View
            style={
              styles.sectionNumber
            }
          >
            <Text
              style={
                styles.sectionNumberText
              }
            >
              01
            </Text>
          </View>
        </View>

        {/* IDENTIFICAÇÃO */}

        <SectionHeader
          number="01"
          title="Identificação"
        />

        <View
          style={
            styles.parametersGrid
          }
        >
          
          

          {renderInput(
            'Linha de produção',
            'linha_producao',
            undefined,
            'select',
            {
              options: [
                'L-A',
                'L-B',
                'L-C',
              ],
            }
          )}

          {renderInput(
            'Turno',
            'turno',
            undefined,
            'select',
            {
              options: [
                'manha',
                'tarde',
                'noite',
              ],
            }
          )}

          {renderInput(
            'Máquina',
            'maquina',
            undefined,
            'select',
            {
              options: [
                'M01',
                'M02',
                'M03',
                'M04',
                'M05',
                'M06',
                'M07',
                'M08',
                'M09',
                'M10',
              ],
            }
          )}

          {renderInput(
            'Idade da máquina (anos)',
            'idade_maquina_anos',
            '0',
            'number',
            {
              min: 0,
              max: 100,
            }
          )}
        </View>

        {/* SENSORES */}

        <SectionHeader
          number="02"
          title="Sensores e ambiente"
        />

        <View
          style={
            styles.parametersGrid
          }
        >
          {renderInput(
            'Temperatura',
            'temperatura_valor',
            '0',
            'number',
            {
              min: -273.15,
              max: 2000,
            }
          )}

          {renderInput(
            'Unidade da temperatura',
            'unidade_temperatura',
            undefined,
            'select',
            {
              options: [
                'C',
                'F',
                'K',
              ],
            }
          )}

          {renderInput(
            'Pressão',
            'pressao_valor',
            '0',
            'number',
            {
              min: 0,
              max: 100,
            }
          )}

          {renderInput(
            'Unidade da pressão',
            'unidade_pressao',
            undefined,
            'select',
            {
              options: [
                'bar',
                'psi',
                'Pa',
              ],
            }
          )}

          {renderInput(
            'Vibração do motor',
            'vibracao_motor_mm_s',
            '0',
            'number',
            {
              min: 0,
              max: 100,
            }
          )}

          {renderInput(
            'Velocidade da esteira',
            'velocidade_esteira_m_min',
            '0',
            'number',
            {
              min: 0,
              max: 200,
            }
          )}

          {renderInput(
            'Umidade',
            'umidade_pct',
            '0',
            'number',
            {
              min: 0,
              max: 100,
            }
          )}
        </View>

        {/* PRODUÇÃO */}

        <SectionHeader
          number="03"
          title="Produção e operação"
        />

        <View
          style={
            styles.parametersGrid
          }
        >
          {renderInput(
            'Tamanho do lote',
            'tamanho_lote',
            '0',
            'number',
            {
              min: 1,
              max: 100000,
            }
          )}

          {renderInput(
            'Tempo de setup',
            'tempo_setup_min',
            '0',
            'number',
            {
              min: 0,
              max: 1440,
            }
          )}

          {renderInput(
            'Paradas não planejadas',
            'paradas_nao_planejadas',
            '0',
            'number',
            {
              min: 0,
              max: 100,
            }
          )}

          {renderInput(
            'Taxa de defeitos',
            'taxa_defeitos_pct',
            '0',
            'number',
            {
              min: 0,
              max: 100,
            }
          )}

          {renderInput(
            'Código da campanha',
            'codigo_campanha',
            'C99',
            'text'
          )}
        </View>

        {/* ENERGIA */}

        <SectionHeader
          number="04"
          title="Energia e consumo"
        />

        <View
          style={
            styles.parametersGrid
          }
        >
          {renderInput(
            'Energia sensor B',
            'energia_sensor_b_kwh',
            '0',
            'number',
            {
              min: 0,
              max: 100000,
            }
          )}

          {renderInput(
            'Consumo de energia',
            'consumo_energia_kwh',
            '0',
            'number',
            {
              min: 0,
              max: 100000,
            }
          )}
        </View>
      </View>

      {/* EXECUÇÃO */}

      <View
        style={
          styles.actionCard
        }
      >
        <View
          style={
            styles.actionInfo
          }
        >
          <Text
            style={
              styles.actionTitle
            }
          >
            Executar predição
          </Text>

          <Text
            style={
              styles.actionDescription
            }
          >
            Os dados informados serão
            enviados ao modelo selecionado
            para estimar a ocorrência de
            falha nas próximas 24 horas.
          </Text>
        </View>

        <ButtonCustom
          title={
            loadingPrediction
              ? 'Realizando predição...'
              : 'Realizar predição'
          }
          onPress={
            handleSubmit
          }
          disabled={
            loadingPrediction ||
            loadingModels ||
            !selectedModel
          }
        />
      </View>

      {/* LOADING */}

      {loadingPrediction && (
        <View
          style={
            styles.loadingCard
          }
        >
          <ActivityIndicator
            size="small"
          />

          <View>
            <Text
              style={
                styles.loadingTitle
              }
            >
              Executando predição
            </Text>

            <Text
              style={
                styles.loadingText
              }
            >
              Enviando os dados
              para o modelo...
            </Text>
          </View>
        </View>
      )}

      {/* RESULTADO */}

      {result !== null && (
        <View
          style={
            styles.resultContainer
          }
        >
          <View
            style={
              styles.resultHeader
            }
          >
            <View>
              <Text
                style={
                  styles.resultTitle
                }
              >
                Resultado da predição
              </Text>

              <Text
                style={
                  styles.resultSubtitle
                }
              >
                Estimativa realizada pelo
                modelo selecionado
              </Text>
            </View>

            <View
              style={[
                styles.resultBadge,
                predictionIsFailure
                  ? styles.failureBadge
                  : styles.successBadge,
              ]}
            >
              <Text
                style={
                  styles.resultBadgeText
                }
              >
                PREDIÇÃO
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.predictionCard,
              predictionIsFailure
                ? styles.failureCard
                : styles.successCard,
            ]}
          >
            <View
              style={[
                styles.predictionIcon,
                predictionIsFailure
                  ? styles.failureIcon
                  : styles.successIcon,
              ]}
            >
              <Text
                style={
                  styles.predictionIconText
                }
              >
                {predictionIsFailure
                  ? '!'
                  : '✓'}
              </Text>
            </View>

            <Text
              style={[
                styles.predictionText,
                predictionIsFailure
                  ? styles.failureText
                  : styles.successText,
              ]}
            >
              {predictionIsFailure
                ? 'Falha'
                : 'Sem Falha'}
            </Text>

            <Text
              style={
                styles.predictionDescription
              }
            >
              {predictionIsFailure
                ? 'O modelo identificou risco de falha nas próximas 24 horas.'
                : 'O modelo não identificou risco de falha nas próximas 24 horas.'}
            </Text>
          </View>
        </View>
      )}

      {/* ERRO */}

      {responseText != null && (
        <View
          style={
            styles.errorContainer
          }
        >
          <View
            style={
              styles.errorIcon
            }
          >
            <Text
              style={
                styles.errorIconText
              }
            >
              !
            </Text>
          </View>

          <View
            style={
              styles.errorContent
            }
          >
            <Text
              style={
                styles.errorTitle
              }
            >
              Erro na operação
            </Text>

            <Text
              style={
                styles.errorText
              }
            >
              {responseText}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

/* =====================================================
   COMPONENTES AUXILIARES
===================================================== */

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  
  const colorScheme = useColorScheme();
  
    const styles =
      colorScheme === 'dark'
        ? themeStyles.dark
        : themeStyles.light;
  return (
    <View
      style={
        styles.metric
      }
    >
      <Text
        style={
          styles.metricLabel
        }
      >
        {label}
      </Text>

      <Text
        style={
          styles.metricValue
        }
      >
        {(value * 100).toFixed(1)}%
      </Text>
    </View>
  );
}

function SectionHeader({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  
  const colorScheme = useColorScheme();
  
    const styles =
      colorScheme === 'dark'
        ? themeStyles.dark
        : themeStyles.light;
  return (
    <View
      style={
        styles.sectionHeader
      }
    >
      <View
        style={
          styles.sectionLine
        }
      />

      <View
        style={
          styles.sectionNumberSmall
        }
      >
        <Text
          style={
            styles.sectionNumberSmallText
          }
        >
          {number}
        </Text>
      </View>

      <Text
        style={
          styles.sectionTitle
        }
      >
        {title}
      </Text>
    </View>
  );
}

/* =====================================================
   STYLES
===================================================== */

// =============================================================
// THEMES
// =============================================================

const themeStyles = {
  // ===========================================================
  // LIGHT THEME
  // ===========================================================
  light: StyleSheet.create({
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

  /* HEADER */

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
    fontSize: 10,
    fontWeight: '800',
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
    maxWidth: 720,
    fontSize: 15,
    lineHeight: 23,
    opacity: 0.62,
  },

  /* CARD */

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

  countBadge: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
  },

  countBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },

  /* MODELOS */

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
    transform: [
      {
        scale: 0.98,
      },
    ],
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

  modelsLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },

  loadingText: {
    fontSize: 12,
    opacity: 0.6,
  },

  /* MODELO SELECIONADO */

  selectedModelContainer: {
    minHeight: 100,
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
    fontSize: 18,
    fontWeight: '800',
    color: '#172033',
  },

  modelId: {
    fontSize: 10,
    marginTop: 3,
    color: '#64748B',
  },

  metricsContainer: {
    flexDirection: 'row',
    gap: 14,
  },

  metric: {
    alignItems: 'flex-end',
  },

  metricLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },

  metricValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#172033',
  },

  /* SEÇÕES */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 18,
  },

  sectionLine: {
    width: 3,
    height: 20,
    borderRadius: 2,
    marginRight: 9,
    backgroundColor: '#2563EB',
  },

  sectionNumberSmall: {
    width: 25,
    height: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#EFF6FF',
  },

  sectionNumberSmallText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#2563EB',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },

  sectionNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
  },

  sectionNumberText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
  },

  /* INPUTS */

  parametersGrid: {
    gap: 16,
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

  rangeText: {
    fontSize: 10,
    marginTop: 5,
    color: '#8A94A3',
  },

  datePickerContainer: {
    minHeight: 45,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDE2E8',
    backgroundColor: '#FAFBFC',
  },

  dateValue: {
    fontSize: 10,
    marginTop: 5,
    color: '#8A94A3',
  },

  /* SELECT */

  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },

  selectOption: {
    minHeight: 42,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#DDE2E8',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFBFC',
  },

  selectOptionSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },

  selectOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },

  selectOptionTextSelected: {
    color: '#1D4ED8',
  },

  /* ACTION */

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
    maxWidth: 720,
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.55,
  },

  /* LOADING */

  loadingCard: {
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

  /* RESULTADO */

  resultContainer: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E3E7ED',
    backgroundColor: '#FFFFFF',
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: '800',
  },

  resultSubtitle: {
    fontSize: 12,
    marginTop: 3,
    opacity: 0.55,
  },

  resultBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },

  successBadge: {
    backgroundColor: '#DCFCE7',
  },

  failureBadge: {
    backgroundColor: '#FEE2E2',
  },

  resultBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
  },

  predictionCard: {
    minHeight: 180,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  failureCard: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },

  successCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },

  predictionIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  failureIcon: {
    backgroundColor: '#DC2626',
  },

  successIcon: {
    backgroundColor: '#16A34A',
  },

  predictionIconText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  predictionText: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 5,
  },

  failureText: {
    color: '#B91C1C',
  },

  successText: {
    color: '#15803D',
  },

  predictionDescription: {
    maxWidth: 600,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.6,
  },

  /* ERRO */

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
  }
}),
  dark: StyleSheet.create({
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

  /* HEADER */

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
    fontSize: 10,
    fontWeight: '800',
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
    maxWidth: 720,
    fontSize: 15,
    lineHeight: 23,
    opacity: 0.62,
  },

  /* CARD */

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

  countBadge: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
  },

  countBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },

  /* MODELOS */

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
    transform: [
      {
        scale: 0.98,
      },
    ],
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

  modelsLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },

  loadingText: {
    fontSize: 12,
    opacity: 0.6,
  },

  /* MODELO SELECIONADO */

  selectedModelContainer: {
    minHeight: 100,
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
    fontSize: 18,
    fontWeight: '800',
    color: '#172033',
  },

  modelId: {
    fontSize: 10,
    marginTop: 3,
    color: '#64748B',
  },

  metricsContainer: {
    flexDirection: 'row',
    gap: 14,
  },

  metric: {
    alignItems: 'flex-end',
  },

  metricLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },

  metricValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#172033',
  },

  /* SEÇÕES */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 18,
  },

  sectionLine: {
    width: 3,
    height: 20,
    borderRadius: 2,
    marginRight: 9,
    backgroundColor: '#2563EB',
  },

  sectionNumberSmall: {
    width: 25,
    height: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#EFF6FF',
  },

  sectionNumberSmallText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#2563EB',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },

  sectionNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
  },

  sectionNumberText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
  },

  /* INPUTS */

  parametersGrid: {
    gap: 16,
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

  rangeText: {
    fontSize: 10,
    marginTop: 5,
    color: '#8A94A3',
  },

  datePickerContainer: {
    minHeight: 45,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDE2E8',
    backgroundColor: '#FAFBFC',
  },

  dateValue: {
    fontSize: 10,
    marginTop: 5,
    color: '#8A94A3',
  },

  /* SELECT */

  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },

  selectOption: {
    minHeight: 42,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#DDE2E8',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFBFC',
  },

  selectOptionSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },

  selectOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },

  selectOptionTextSelected: {
    color: '#1D4ED8',
  },

  /* ACTION */

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
    maxWidth: 720,
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.55,
  },

  /* LOADING */

  loadingCard: {
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

  /* RESULTADO */

  resultContainer: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E3E7ED',
    backgroundColor: '#FFFFFF',
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: '800',
  },

  resultSubtitle: {
    fontSize: 12,
    marginTop: 3,
    opacity: 0.55,
  },

  resultBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },

  successBadge: {
    backgroundColor: '#DCFCE7',
  },

  failureBadge: {
    backgroundColor: '#FEE2E2',
  },

  resultBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
  },

  predictionCard: {
    minHeight: 180,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  failureCard: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },

  successCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },

  predictionIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  failureIcon: {
    backgroundColor: '#DC2626',
  },

  successIcon: {
    backgroundColor: '#16A34A',
  },

  predictionIconText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  predictionText: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 5,
  },

  failureText: {
    color: '#B91C1C',
  },

  successText: {
    color: '#15803D',
  },

  predictionDescription: {
    maxWidth: 600,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.6,
  },

  /* ERRO */

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
  }
  })
}
;
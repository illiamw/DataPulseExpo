import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";

export default function AboutDataPulse() {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 768;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.badge}>MLOps • Data Engineering • Machine Learning 
          </Text>

          <Text style={styles.heroTitle}>
            Linha industrial
          </Text>

          <Text style={styles.heroSubtitle}>
            Plataforma de treinamento e predição de falhas
            para processos industriais.
          </Text>

          <Text style={styles.heroDescription}>
            Um projeto completo de dados e Machine Learning que integra
            engenharia de dados, modelos preditivos, MLflow, APIs,
            containers e CI/CD em uma única solução.
          </Text>
        </View>
      </View>

      {/* ===================================================== */}
      {/* IMAGEM HERO */}
      {/* ===================================================== */}

      <ImagePlaceholder
        title="Imagem principal do DataPulse"
        description="Insira aqui uma imagem da aplicação, dashboard ou arquitetura geral."
        height={260}
      />

      {/* ===================================================== */}
      {/* SOBRE O PROJETO */}
      {/* ===================================================== */}

      <Section
        eyebrow="01 • O PROJETO"
        title="Dados industriais transformados em decisões"
      >
        <Text style={styles.paragraph}>
          A linha industrial foi desenvolvido a partir de uma base sintética
          inspirada em um cenário industrial realista, no qual máquinas
          e processos produtivos são monitorados continuamente por
          sensores.
        </Text>

        <Text style={styles.paragraph}>
          A proposta é reproduzir desafios encontrados em projetos reais
          de dados, desde a ingestão e tratamento das informações até o
          treinamento, versionamento e disponibilização de modelos de
          Machine Learning.
        </Text>

        <View style={styles.cardsRow}>
          <InfoCard
            icon="01"
            title="Engenharia de Dados"
            description="Tratamento, transformação e organização dos dados em diferentes camadas."
          />

          <InfoCard
            icon="02"
            title="Machine Learning"
            description="Treinamento e comparação de diferentes algoritmos de classificação."
          />

          <InfoCard
            icon="03"
            title="MLOps"
            description="Experimentos, modelos, containers, API e automação de deploy."
          />
        </View>
      </Section>

      {/* ===================================================== */}
      {/* DADOS */}
      {/* ===================================================== */}

      <Section
        eyebrow="02 • DADOS SINTÉTICOS"
        title="Uma base construída para representar problemas reais"
      >
        <Text style={styles.paragraph}>
          A base utilizada pelo projeto é sintética, mas foi construída
          para reproduzir problemas comuns encontrados em dados
          industriais.
        </Text>

        <View style={styles.featureGrid}>
          <Feature text="Datas em formatos diferentes" />
          <Feature text="Unidades de medida inconsistentes" />
          <Feature text="Categorias inconsistentes" />
          <Feature text="Valores ausentes" />
          <Feature text="Valores fisicamente impossíveis" />
          <Feature text="Registros duplicados" />
          <Feature text="Variáveis redundantes" />
          <Feature text="Variáveis irrelevantes" />
          <Feature text="Outliers" />
          <Feature text="Dados numéricos em formato textual" />
          <Feature text="Transformação simbólico-numérica" />
          <Feature text="Transformação numérica-numérica" />
        </View>
      </Section>

      <ImagePlaceholder
        title="Visualização dos dados"
        description="Espaço para screenshot do notebook, dataset ou análise exploratória."
        height={280}
      />

      {/* ===================================================== */}
      {/* PIPELINE MEDALHÃO */}
      {/* ===================================================== */}

      <Section
        eyebrow="03 • DATA ENGINEERING"
        title="Pipeline de dados com arquitetura medalhão"
      >
        <Text style={styles.paragraph}>
          O pipeline organiza o processamento dos dados em camadas,
          permitindo separar a ingestão dos dados brutos das etapas de
          tratamento, transformação e disponibilização para consumo.
        </Text>

        <View style={styles.medallionContainer}>
          <Medallion
            title="RAW"
            subtitle="Dados brutos"
            description="Dados originalmente recebidos, preservando a informação de origem."
          />

          <Text style={styles.arrow}>→</Text>

          <Medallion
            title="SILVER"
            subtitle="Dados tratados"
            description="Dados limpos, padronizados, tipados e preparados para transformação."
          />

          <Text style={styles.arrow}>→</Text>

          <Medallion
            title="GOLD"
            subtitle="Dados analíticos"
            description="Dados preparados para análises, modelos e aplicações."
          />
        </View>
      </Section>

      <ImagePlaceholder
        title="Arquitetura do pipeline"
        description="Insira aqui o diagrama da arquitetura RAW → SILVER → GOLD."
        height={300}
      />

      {/* ===================================================== */}
      {/* OBJETIVOS ML */}
      {/* ===================================================== */}

      <Section
        eyebrow="04 • MACHINE LEARNING"
        title="Modelos para entender e antecipar o processo"
      >
        <Text style={styles.paragraph}>
          A solução foi estruturada para trabalhar com problemas de
          regressão e classificação dentro do contexto industrial.
        </Text>

        <View style={styles.objectiveCard}>
          <View style={styles.objectiveNumber}>
            <Text style={styles.objectiveNumberText}>01</Text>
          </View>

          <View style={styles.objectiveContent}>
            <Text style={styles.objectiveTitle}>
              Previsão de consumo de energia
            </Text>

            <Text style={styles.objectiveText}>
              Utilização de modelos de regressão para estimar o consumo
              energético do processo produtivo.
            </Text>
          </View>
        </View>

        <View style={styles.objectiveCard}>
          <View style={styles.objectiveNumber}>
            <Text style={styles.objectiveNumberText}>02</Text>
          </View>

          <View style={styles.objectiveContent}>
            <Text style={styles.objectiveTitle}>
              Predição de falha em 24 horas
            </Text>

            <Text style={styles.objectiveText}>
              Classificação do estado operacional da máquina para
              identificar se existe indicação de falha nas próximas
              24 horas.
            </Text>
          </View>
        </View>
      </Section>

      {/* ===================================================== */}
      {/* MODELOS */}
      {/* ===================================================== */}

      <Section
        eyebrow="05 • MODELOS"
        title="Experimentação com diferentes algoritmos"
      >
        <Text style={styles.paragraph}>
          O projeto utiliza diferentes algoritmos de classificação,
          permitindo comparar abordagens com características distintas
          para o mesmo problema.
        </Text>

        <View style={styles.modelGrid}>
          <ModelCard name="GaussianNB" />
          <ModelCard name="KNN" />
          <ModelCard name="SVM" />
          <ModelCard name="Gradient Boosting" />
          <ModelCard name="Random Forest" />
          <ModelCard name="Logistic Regression" />
          <ModelCard name="Decision Tree" />
          <ModelCard name="XGBoost" />
        </View>
      </Section>

      <ImagePlaceholder
        title="Experimentos no MLflow"
        description="Espaço para screenshot do MLflow mostrando experimentos e métricas."
        height={300}
      />

      {/* ===================================================== */}
      {/* MLFLOW */}
      {/* ===================================================== */}

      <Section
        eyebrow="06 • MLOPS"
        title="Experimentação e gerenciamento de modelos"
      >
        <Text style={styles.paragraph}>
          O MLflow é utilizado como parte da infraestrutura de MLOps
          para registrar experimentos, parâmetros, métricas e artefatos
          produzidos durante o treinamento.
        </Text>

        <View style={styles.flowContainer}>
          <FlowStep title="Dados" />
          <Text style={styles.flowArrow}>→</Text>

          <FlowStep title="Treinamento" />
          <Text style={styles.flowArrow}>→</Text>

          <FlowStep title="Experimento" />
          <Text style={styles.flowArrow}>→</Text>

          <FlowStep title="Modelo" />
          <Text style={styles.flowArrow}>→</Text>

          <FlowStep title="API" />
        </View>
      </Section>

      {/* ===================================================== */}
      {/* ARQUITETURA */}
      {/* ===================================================== */}

      <Section
        eyebrow="07 • ARQUITETURA"
        title="Da infraestrutura ao endpoint de predição"
      >
        <Text style={styles.paragraph}>
          A aplicação é organizada em serviços independentes executados
          através de containers Docker.
        </Text>

        <View style={styles.architecture}>
          <ArchitectureBox
            title="Expo"
            description="Aplicação Web / Android"
          />

          <Text style={styles.archArrow}>↓</Text>

          <ArchitectureBox
            title="FastAPI"
            description="API de inferência"
          />

          <Text style={styles.archArrow}>↓</Text>

          <ArchitectureBox
            title="MLflow"
            description="Modelos e experimentos"
          />

          <Text style={styles.archArrow}>↓</Text>

          <ArchitectureBox
            title="PostgreSQL"
            description="Persistência"
          />
        </View>
      </Section>

      <ImagePlaceholder
        title="Arquitetura completa"
        description="Insira aqui o diagrama completo da infraestrutura do DataPulse."
        height={360}
      />

      {/* ===================================================== */}
      {/* CI BACKEND */}
      {/* ===================================================== */}

      <Section
        eyebrow="08 • CI/CD BACKEND"
        title="Automação do ciclo de desenvolvimento"
      >
        <Text style={styles.paragraph}>
          O backend possui um pipeline automatizado utilizando GitHub
          Actions, Docker Compose e Docker Hub.
        </Text>

        <View style={styles.pipeline}>
          <PipelineStep number="01" title="Push" />
          <PipelineStep number="02" title="Checkout" />
          <PipelineStep number="03" title="Compose Validate" />
          <PipelineStep number="04" title="Docker Build" />
          <PipelineStep number="05" title="Start Services" />
          <PipelineStep number="06" title="API Test" />
          <PipelineStep number="07" title="Docker Push" />
          <PipelineStep number="08" title="Deploy" />
        </View>

        <Text style={styles.codeDescription}>
          O fluxo de CI valida o Docker Compose, constrói os serviços,
          inicializa os containers e executa um teste básico contra a
          API FastAPI.
        </Text>
      </Section>

      <ImagePlaceholder
        title="GitHub Actions — Backend"
        description="Insira aqui um screenshot do workflow de CI/CD."
        height={320}
      />

      {/* ===================================================== */}
      {/* CD */}
      {/* ===================================================== */}

      <Section
        eyebrow="09 • DEPLOY"
        title="Entrega automatizada da infraestrutura"
      >
        <Text style={styles.paragraph}>
          Após a validação do pipeline de integração contínua, o processo
          de entrega atualiza o ambiente remoto, baixa as imagens mais
          recentes e reinicia os serviços Docker.
        </Text>

        <View style={styles.deployFlow}>
          <FlowStep title="GitHub" />
          <Text style={styles.flowArrow}>→</Text>

          <FlowStep title="Docker Hub" />
          <Text style={styles.flowArrow}>→</Text>

          <FlowStep title="SSH" />
          <Text style={styles.flowArrow}>→</Text>

          <FlowStep title="Oracle Cloud" />
        </View>
      </Section>

      {/* ===================================================== */}
      {/* EXPO */}
      {/* ===================================================== */}

      <Section
        eyebrow="10 • APLICAÇÃO"
        title="Uma aplicação construída com Expo"
      >
        <Text style={styles.paragraph}>
          O frontend do DataPulse foi desenvolvido utilizando Expo,
          React Native e TypeScript, permitindo compartilhar a mesma
          base de código entre Android e Web.
        </Text>

        <View style={styles.cardsRow}>
          <InfoCard
            icon="WEB"
            title="Web"
            description="Aplicação acessível através do navegador."
          />

          <InfoCard
            icon="APP"
            title="Android"
            description="Aplicação distribuída através do ecossistema Android."
          />

          <InfoCard
            icon="API"
            title="Integração"
            description="Comunicação com a API FastAPI para realizar as predições."
          />
        </View>
      </Section>

      <ImagePlaceholder
        title="Aplicação DataPulse"
        description="Insira aqui screenshots da aplicação Web e Android."
        height={360}
      />

      {/* ===================================================== */}
      {/* EXPO CI/CD */}
      {/* ===================================================== */}

      <Section
        eyebrow="11 • CI/CD MOBILE"
        title="Build e distribuição automatizados"
      >
        <Text style={styles.paragraph}>
          O projeto Expo também possui automação independente para
          Android e Web.
        </Text>

        <View style={styles.twoColumn}>
          <View style={styles.cicdCard}>
            <Text style={styles.cicdTitle}>Android</Text>

            <Text style={styles.cicdText}>
              GitHub Actions
            </Text>

            <Text style={styles.cicdText}>
              ↓
            </Text>

            <Text style={styles.cicdText}>
              Node.js + npm
            </Text>

            <Text style={styles.cicdText}>
              ↓
            </Text>

            <Text style={styles.cicdText}>
              EAS Build
            </Text>

            <Text style={styles.cicdText}>
              ↓
            </Text>

            <Text style={styles.cicdText}>
              Google Play
            </Text>
          </View>

          <View style={styles.cicdCard}>
            <Text style={styles.cicdTitle}>Web</Text>

            <Text style={styles.cicdText}>
              GitHub Actions
            </Text>

            <Text style={styles.cicdText}>
              ↓
            </Text>

            <Text style={styles.cicdText}>
              SSH
            </Text>

            <Text style={styles.cicdText}>
              ↓
            </Text>

            <Text style={styles.cicdText}>
              Docker Build
            </Text>

            <Text style={styles.cicdText}>
              ↓
            </Text>

            <Text style={styles.cicdText}>
              Oracle Cloud
            </Text>
          </View>
        </View>
      </Section>

      <ImagePlaceholder
        title="CI/CD Expo"
        description="Espaço para screenshot dos workflows Android e Web."
        height={320}
      />

      {/* ===================================================== */}
      {/* RESULTADO */}
      {/* ===================================================== */}

      <View style={styles.finalSection}>
        <Text style={styles.finalEyebrow}>
          DATA • ML • OPS
        </Text>

        <Text style={styles.finalTitle}>
          Do dado bruto à predição
        </Text>

        <Text style={styles.finalText}>
          O DataPulse reúne engenharia de dados, arquitetura medalhão,
          Machine Learning, MLflow, APIs, containers e CI/CD em um
          fluxo único de desenvolvimento e entrega.
        </Text>

        <View style={styles.finalFlow}>
          <Text style={styles.finalFlowText}>Dados</Text>
          <Text style={styles.finalArrow}>→</Text>
          <Text style={styles.finalFlowText}>Pipeline</Text>
          <Text style={styles.finalArrow}>→</Text>
          <Text style={styles.finalFlowText}>Modelo</Text>
          <Text style={styles.finalArrow}>→</Text>
          <Text style={styles.finalFlowText}>API</Text>
          <Text style={styles.finalArrow}>→</Text>
          <Text style={styles.finalFlowText}>Aplicação</Text>
        </View>
      </View>
    </ScrollView>
  );
}


/* ========================================================= */
/* COMPONENTES AUXILIARES                                    */
/* ========================================================= */

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>
        {eyebrow}
      </Text>

      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {children}
    </View>
  );
}


function ImagePlaceholder({
  title,
  description,
  height,
}: {
  title: string;
  description: string;
  height: number;
}) {
  return (
    <View
      style={[
        styles.imagePlaceholder,
        { height },
      ]}
    >
      <Text style={styles.imageIcon}>
        +
      </Text>

      <Text style={styles.imageTitle}>
        {title}
      </Text>

      <Text style={styles.imageDescription}>
        {description}
      </Text>
    </View>
  );
}


function InfoCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Text style={styles.infoIconText}>
          {icon}
        </Text>
      </View>

      <Text style={styles.infoTitle}>
        {title}
      </Text>

      <Text style={styles.infoDescription}>
        {description}
      </Text>
    </View>
  );
}


function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <View style={styles.feature}>
      <Text style={styles.featureCheck}>
        ✓
      </Text>

      <Text style={styles.featureText}>
        {text}
      </Text>
    </View>
  );
}


function Medallion({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <View style={styles.medallion}>
      <Text style={styles.medallionTitle}>
        {title}
      </Text>

      <Text style={styles.medallionSubtitle}>
        {subtitle}
      </Text>

      <Text style={styles.medallionDescription}>
        {description}
      </Text>
    </View>
  );
}


function ModelCard({
  name,
}: {
  name: string;
}) {
  return (
    <View style={styles.modelCard}>
      <View style={styles.modelDot} />

      <Text style={styles.modelName}>
        {name}
      </Text>
    </View>
  );
}


function FlowStep({
  title,
}: {
  title: string;
}) {
  return (
    <View style={styles.flowStep}>
      <Text style={styles.flowStepText}>
        {title}
      </Text>
    </View>
  );
}


function ArchitectureBox({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={styles.architectureBox}>
      <Text style={styles.architectureTitle}>
        {title}
      </Text>

      <Text style={styles.architectureDescription}>
        {description}
      </Text>
    </View>
  );
}


function PipelineStep({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <View style={styles.pipelineStep}>
      <Text style={styles.pipelineNumber}>
        {number}
      </Text>

      <Text style={styles.pipelineTitle}>
        {title}
      </Text>
    </View>
  );
}


/* ========================================================= */
/* STYLES                                                     */
/* ========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC"
  },

  content: {
    paddingBottom: 80
    
  },
  /* HERO */

  hero: {
    backgroundColor: "#0F172A",
    paddingVertical: 80,
    paddingHorizontal: 24,
    paddingTop: 120
  },

  heroContent: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
  },

  badge: {
    color: "#38BDF8",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 20,
    textTransform: "uppercase",
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 58,
    fontWeight: "900",
    marginBottom: 16,
  },

  heroSubtitle: {
    color: "#E2E8F0",
    fontSize: 28,
    lineHeight: 38,
    fontWeight: "600",
    maxWidth: 800,
  },

  heroDescription: {
    color: "#94A3B8",
    fontSize: 17,
    lineHeight: 28,
    marginTop: 24,
    maxWidth: 760,
  },

  /* SECTIONS */

  section: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 80,
  },

  eyebrow: {
    color: "#0284C7",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 10,
  },

  sectionTitle: {
    color: "#0F172A",
    fontSize: 34,
    lineHeight: 42,
    fontWeight: "800",
    marginBottom: 24,
  },

  paragraph: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 18,
    maxWidth: 900,
  },

  /* IMAGE */

  imagePlaceholder: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
    marginTop: 40,
    paddingHorizontal: 24,
    borderRadius: 18,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },

  imageIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E2E8F0",
    color: "#64748B",
    textAlign: "center",
    lineHeight: 46,
    fontSize: 30,
    marginBottom: 14,
  },

  imageTitle: {
    color: "#334155",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  imageDescription: {
    color: "#64748B",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 600,
  },

  /* CARDS */

  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 24,
  },

  infoCard: {
    flex: 1,
    minWidth: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  infoIconText: {
    color: "#0284C7",
    fontSize: 11,
    fontWeight: "900"
  },

  infoTitle: {
    color: "#0F172A",
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 8
  },

  infoDescription: {
    color: "#64748B",
    fontSize: 14,
    lineHeight: 22,
  },

  /* FEATURES */

  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 20,
  },

  feature: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    minWidth: 280,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  featureCheck: {
    color: "#0284C7",
    fontSize: 17,
    fontWeight: "800",
    marginRight: 10,
  },

  featureText: {
    flex: 1,
    color: "#475569",
    fontSize: 14,
  },

  /* MEDALLION */

  medallionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginTop: 30,
  },

  medallion: {
    flex: 1,
    minWidth: 230,
    maxWidth: 330,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  medallionTitle: {
    color: "#0284C7",
    fontSize: 28,
    fontWeight: "900",
  },

  medallionSubtitle: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },

  medallionDescription: {
    color: "#64748B",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },

  arrow: {
    color: "#94A3B8",
    fontSize: 28,
    fontWeight: "300",
  },

  /* OBJECTIVES */

  objectiveCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 22,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  objectiveNumber: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  objectiveNumberText: {
    color: "#0284C7",
    fontWeight: "900",
  },

  objectiveContent: {
    flex: 1,
  },

  objectiveTitle: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "800",
  },

  objectiveText: {
    color: "#64748B",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6,
  },

  /* MODELS */

  modelGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  modelCard: {
    width: "23%",
    minWidth: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  modelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0284C7",
    marginRight: 10,
  },

  modelName: {
    color: "#334155",
    fontWeight: "700",
    fontSize: 14,
  },

  /* FLOW */

  flowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 30,
  },

  flowStep: {
    backgroundColor: "#0F172A",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  flowStepText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  flowArrow: {
    color: "#94A3B8",
    fontSize: 24,
  },

  /* ARCHITECTURE */

  architecture: {
    alignItems: "center",
    marginTop: 30,
  },

  architectureBox: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },

  architectureTitle: {
    color: "#0F172A",
    fontSize: 19,
    fontWeight: "800",
  },

  architectureDescription: {
    color: "#64748B",
    marginTop: 5,
  },

  archArrow: {
    color: "#0284C7",
    fontSize: 26,
    marginVertical: 8,
  },

  /* PIPELINE */

  pipeline: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 30,
  },

  pipelineStep: {
    width: 240,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  pipelineNumber: {
    color: "#0284C7",
    fontSize: 12,
    fontWeight: "900",
  },

  pipelineTitle: {
    color: "#334155",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 7,
  },

  codeDescription: {
    color: "#64748B",
    fontSize: 15,
    lineHeight: 25,
    marginTop: 24,
  },

  /* DEPLOY */

  deployFlow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 30,
  },

  /* TWO COLUMN */

  twoColumn: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
  },

  cicdCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: "#0F172A",
    borderRadius: 18,
    padding: 28,
    alignItems: "center",
  },

  cicdTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },

  cicdText: {
    color: "#CBD5E1",
    fontSize: 15,
    marginVertical: 5,
  },

  /* FINAL */

  finalSection: {
    marginTop: 100,
    backgroundColor: "#0F172A",
    paddingVertical: 80,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  finalEyebrow: {
    color: "#38BDF8",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
  },

  finalTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 12,
  },

  finalText: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
    maxWidth: 750,
    marginTop: 20,
  },

  finalFlow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 36,
  },

  finalFlowText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  finalArrow: {
    color: "#38BDF8",
    fontSize: 20,
  },
});

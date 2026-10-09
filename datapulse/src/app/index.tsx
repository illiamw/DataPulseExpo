import React, { useState } from 'react';

import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  useColorScheme
} from 'react-native';

import { useAuth, useSignIn, useSSO } from '@clerk/expo';

import { useSignInWithGoogle } from '@clerk/expo/google';

import { useRouter } from 'expo-router';

import TextInputCustom from '@/components/ui/TextInputCustom';
import ButtonCustom from '@/components/ui/ButtonCustom';
import ButtonSocialCustom from '@/components/ui/ButtonSocialCustom';


export default function MainScreen() {
  const colorScheme = useColorScheme();

  const styles =
    colorScheme === 'dark'
      ? themeStyles.dark
      : themeStyles.light;

  // =========================================================
  // CLERK
  // =========================================================

  const { isLoaded, isSignedIn } = useAuth();
  const { signIn } = useSignIn();

  // =========================================================
  // ROUTER
  // =========================================================

  const router = useRouter();

  // =========================================================
  // RESPONSIVIDADE
  // =========================================================

  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 768;

  // =========================================================
  // GOOGLE AUTH
  // =========================================================

  const {
    startGoogleAuthenticationFlow,
  } = useSignInWithGoogle();

  const {
    startSSOFlow,
  } = useSSO();

  // =========================================================
  // FORM
  // =========================================================

  const [emailAddress, setEmailAddress] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // =========================================================
  // VERIFICATION
  // =========================================================

  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // =========================================================
  // EMAIL VALIDATION
  // =========================================================

  const validateEmail = (email: string) => {

    if (email.length === 0) {
      return 'Email é obrigatório';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return 'Digite um email válido';
    }

    return '';
  };

  // =========================================================
  // PASSWORD VALIDATION
  // =========================================================

  const validatePassword = (password: string) => {

    if (password.length === 0) {
      return '';
    }

    if (password.length < 15) {
      return 'A senha deve ter pelo menos 15 caracteres';
    }

    if (!/[A-Z]/.test(password)) {
      return 'A senha deve conter uma letra maiúscula';
    }

    if (!/[a-z]/.test(password)) {
      return 'A senha deve conter uma letra minúscula';
    }

    if (!/[0-9]/.test(password)) {
      return 'A senha deve conter um número';
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(password)) {
      return 'A senha deve conter um caractere especial';
    }

    return '';
  };

  // =========================================================
  // INPUT HANDLERS
  // =========================================================

  const handleEmailChange = (text: string) => {

    setEmailAddress(text);

    setEmailError(
      validateEmail(text)
    );
  };

  const handlePasswordChange = (text: string) => {

    setPassword(text);

    setPasswordError(
      validatePassword(text)
    );
  };

  // =========================================================
  // EMAIL SIGN UP
  // =========================================================

  const handleSignIn = async () => {
    if (!isLoaded) return;

    try {
      setIsLoading(true);

      const { error } = await signIn.password({
        identifier: emailAddress.trim(),
        password,
      });

      if (error) {
        Alert.alert(
          'Erro',
          error.message || 'E-mail ou senha inválidos.'
        );

        return;
      }

      // Finaliza o processo de autenticação
      const { error: finalizeError } = await signIn.finalize();

      if (finalizeError) {
        Alert.alert(
          'Erro',
          finalizeError.message ||
          'Não foi possível finalizar o login.'
        );

        return;
      }

      // Somente depois de finalizar a sessão
      router.replace('/home');

    } catch (error: any) {
      console.error('Erro no login:', error);

      Alert.alert(
        'Erro',
        error?.errors?.[0]?.message ||
        error?.message ||
        'Não foi possível realizar o login.'
      );

    } finally {
      setIsLoading(false);
    }
  };
  // =========================================================
  // GOOGLE LOGIN
  // =========================================================

  const handleTest = async () => {
    router.replace('/home');
  }

  const handleGoogleSignIn = async () => {
    try {
      // =======================================================
      // WEB — OAuth via navegador
      // =======================================================
      if (Platform.OS === 'web') {
        const {
          createdSessionId,
          setActive,
        } = await startSSOFlow({
          strategy: 'oauth_google',
        });


        if (!createdSessionId || !setActive) {
          console.error(
            '[Google Auth][Web] Sessão não criada.',
            { createdSessionId: !!createdSessionId }
          );

          Alert.alert(
            'Login não concluído',
            'O Google não retornou uma sessão válida. Tente novamente.'
          );

          return;
        }

        await setActive({ session: createdSessionId });
        router.replace('/home');
        return;
      }

      // =======================================================
      // ANDROID / IOS — Google nativo com Clerk
      // =======================================================
      const {
        createdSessionId,
        setActive,
      } = await startGoogleAuthenticationFlow();

      if (!createdSessionId || !setActive) {
        console.error(
          '[Google Auth][Native] Sessão não criada.',
          { createdSessionId: !!createdSessionId }
        );

        Alert.alert(
          'Login não concluído',
          'Não foi possível criar sua sessão. Verifique a configuração do login Google e tente novamente.'
        );

        return;
      }

      await setActive({ session: createdSessionId });

      router.replace('/home');


    } catch (error: unknown) {
      console.error(
        '[Google Auth] Falha na autenticação:',
        error
      );


      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível entrar com o Google.';

      Alert.alert('Erro no login', message);


    }
  };


  // =========================================================
  // LOADING CLERK
  // =========================================================

  if (!isLoaded) {
    return null;
  }

  // =========================================================
  // USUÁRIO JÁ AUTENTICADO
  // =========================================================

  if (isSignedIn) {
    router.replace('/home');
    return null;

  }

  // =========================================================
  // EMAIL VERIFICATION
  // =========================================================

  if (isVerifying) {

    return (
      <View
        style={[
          styles.container,
          isLargeScreen && styles.containerLarge,
        ]}
      >

        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Verifique seu email
        </Text>

        <Text style={styles.subtitle}>
          Enviamos um código de verificação para:
        </Text>

        <Text style={styles.email}>
          {emailAddress}
        </Text>

        <TextInputCustom
          label="Código de verificação"
          value={code}
          placeholder="Digite o código"
          onChangeText={setCode}
          keyboardType="numeric"
        />

        {/* <ButtonCustom
          title="Verificar"
          loading={isLoading}
          disabled={code.length === 0}
          onPress={}
        /> */}

      </View>
    );
  }

  // =========================================================
  // LOGIN / SIGN UP
  // =========================================================

  const isFormInvalid =
    emailAddress.length === 0 ||
    password.length === 0 ||
    !!emailError ||
    !!passwordError;

  return (

    <View
      style={[
        styles.container,
        isLargeScreen && styles.containerLarge,
      ]}
    >

      {/* LOGO */}

      <Image
        source={require('@/assets/images/icon.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* EMAIL */}

      <TextInputCustom
        label="Email Address"
        error={emailError}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />

      {/* PASSWORD */}

      <TextInputCustom
        label="Password"
        error={passwordError}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
      />

      {/* EMAIL */}

      <ButtonCustom
        title="Acessar com Email"
        loading={isLoading}
        disabled={isFormInvalid}
        onPress={handleSignIn}
      />
      <Text
        style={styles.signupLink}
        onPress={() => router.push('/signup')}
      >
        Não possui uma conta? Criar conta
      </Text>

      {/* SOCIAL LOGIN */}

      <View style={styles.socialDivider}>
        <View style={styles.dividerLine} />

        <Text style={styles.dividerText}>
          Acessar com conta Social
        </Text>

        <View style={styles.dividerLine} />
      </View>

      <View style={styles.columns}>

        {/* GOOGLE */}

        <View style={styles.col}>

          <ButtonSocialCustom
            onPress={handleGoogleSignIn}
            image={require('@/assets/images/google-icon.png')}
          />

        </View>

        {/* FACEBOOK */}

        <View style={styles.col}>

          <ButtonSocialCustom
            disabled={true}
            onPress={() => {
              Alert.alert(
                'Em breve',
                'Login com Facebook ainda não foi configurado.'
              );
            }}
            image={require('@/assets/images/facebook-icon.png')}
          />

        </View>

        {/* APPLE */}

        <View style={styles.col}>

          <ButtonSocialCustom
            disabled={true}
            onPress={() => {
              Alert.alert(
                'Em breve',
                'Login com Apple ainda não foi configurado.'
              );
            }}
            image={require('@/assets/images/apple-icon.png')}
          />

        </View>

      </View>

      {/* CLERK CAPTCHA - WEB */}

      <View nativeID="clerk-captcha" />

      {/* VERSION */}

      <Text style={styles.text}>
        V 1.0.1
      </Text>

    </View>
  );
}


// =============================================================
// THEMES
// =============================================================

const themeStyles = {
  // ===========================================================
  // LIGHT THEME
  // ===========================================================
  light: StyleSheet.create({

    socialDivider: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginVertical: 24,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#D9D9D9',
    },

    dividerText: {
      marginHorizontal: 12,
      fontSize: 13,
      color: '#777777',
      textAlign: 'center',
    },

    container: {
      flex: 1,
      width: '100%',
      padding: 20,
      gap: 12,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },

    containerLarge: {
      width: '100%',
      maxWidth: 700,
      alignSelf: 'center',
    },

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

    image: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginBottom: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 8,
      color: '#1F2937',
    },

    subtitle: {
      textAlign: 'center',
      color: '#6B7280',
    },

    email: {
      textAlign: 'center',
      fontWeight: '600',
      marginBottom: 10,
      color: '#1F2937',
    },

    text: {
      alignSelf: 'center',
      color: '#374151',
    },

    signupLink: {
      textAlign: 'center',
      marginTop: 10,
      fontWeight: '600',
      color: '#2563EB',
    },

  }),

  // ===========================================================
  // DARK THEME
  // ===========================================================
  dark: StyleSheet.create({

    socialDivider: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginVertical: 24,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#374151',
    },

    dividerText: {
      marginHorizontal: 12,
      fontSize: 13,
      color: '#9CA3AF',
      textAlign: 'center',
    },

    container: {
      flex: 1,
      width: '100%',
      padding: 20,
      gap: 12,
      justifyContent: 'center',
      backgroundColor: '#111827',
    },

    containerLarge: {
      width: '100%',
      maxWidth: 700,
      alignSelf: 'center',
    },

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

    image: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginBottom: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 8,
      color: '#F9FAFB',
    },

    subtitle: {
      textAlign: 'center',
      color: '#9CA3AF',
    },

    email: {
      textAlign: 'center',
      fontWeight: '600',
      marginBottom: 10,
      color: '#F9FAFB',
    },

    text: {
      alignSelf: 'center',
      color: '#E5E7EB',
    },

    signupLink: {
      textAlign: 'center',
      marginTop: 10,
      fontWeight: '600',
      color: '#60A5FA',
    },

  }),
};

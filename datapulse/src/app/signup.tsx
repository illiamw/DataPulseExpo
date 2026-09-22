import React, { useState } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';

import { useAuth, useSignUp } from '@clerk/expo';

import { useRouter } from 'expo-router';

import TextInputCustom from '@/components/ui/TextInputCustom';
import ButtonCustom from '@/components/ui/ButtonCustom';

export default function SignUpScreen() {
  // =========================================================
  // CLERK
  // =========================================================

  const { isLoaded, isSignedIn } = useAuth();
  const { signUp } = useSignUp();

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
  // FORM
  // =========================================================

  const [name, setName] = useState('');
  const [nameLast, setNameLast] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // =========================================================
  // ERRORS
  // =========================================================

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameLastError, setNameLastError] = useState('');

  // =========================================================
  // VERIFICATION
  // =========================================================

  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

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
  // USERNAME VALIDATION
  // =========================================================

  const validateUsername = (value: string) => {
    if (value.length === 0) {
      return 'Username é obrigatório';
    }

    if (value.length < 3) {
      return 'Username deve ter pelo menos 3 caracteres';
    }

    if (value.length > 30) {
      return 'Username deve ter no máximo 30 caracteres';
    }

    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return 'Use apenas letras, números e _';
    }

    return '';
  };

  // =========================================================
  // PASSWORD VALIDATION
  // =========================================================

  const validatePassword = (value: string) => {
    if (value.length === 0) {
      return 'Senha é obrigatória';
    }

    if (value.length < 15) {
      return 'A senha deve ter pelo menos 15 caracteres';
    }

    if (!/[A-Z]/.test(value)) {
      return 'A senha deve conter uma letra maiúscula';
    }

    if (!/[a-z]/.test(value)) {
      return 'A senha deve conter uma letra minúscula';
    }

    if (!/[0-9]/.test(value)) {
      return 'A senha deve conter um número';
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(value)) {
      return 'A senha deve conter um caractere especial';
    }

    return '';
  };

  // =========================================================
  // INPUT HANDLERS
  // =========================================================

  const handleNameChange = (value: string) => {
    setName(value.replace(/\s+/g, ' '));
    setNameError('');
    };

    const handleNameLastChange = (value: string) => {
    setNameLast(value.replace(/\s+/g, ' '));
    setNameLastError('');
    };

  const handleEmailChange = (text: string) => {
    setEmailAddress(text);

    setEmailError(
      validateEmail(text)
    );
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);

    setUsernameError(
      validateUsername(text)
    );
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    setPasswordError(
      validatePassword(text)
    );
  };

  // =========================================================
  // SIGN UP
  // =========================================================

  const handleSignUp = async () => {
    if (!isLoaded) {
      return;
    }

    const emailValidation = validateEmail(emailAddress);
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setUsernameError(usernameValidation);
    setPasswordError(passwordValidation);

    if (
      emailValidation ||
      usernameValidation ||
      passwordValidation
    ) {
      return;
    }

    try {
      // =======================================================
      // CRIA O CADASTRO
      // =======================================================
      setIsLoading(true);

      const result = await signUp.password({
        emailAddress: emailAddress.trim(),
        username: username.trim(),
        password,
        firstName: name.trim(),
        lastName: nameLast.trim(),
      });

      if (result.error) {
        setIsError(result.error.message + "Não foi possível criar a conta.");
        Alert.alert(
          'Erro',
          result.error.message ||
            'Não foi possível criar a conta.'
        );
        setIsLoading(false);
        return;
      }

      // =======================================================
      // ENVIA CÓDIGO PARA O EMAIL
      // =======================================================

      const {
        error: sendError,
      } = await signUp.verifications.sendEmailCode();

      if (sendError) {
        setIsError(sendError.message + "Não foi possível criar a conta.");
        Alert.alert(
          'Erro',
          sendError.message ||
            'Não foi possível enviar o código de verificação.'
        );
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setIsVerifying(true);
    } catch (error: any) {
      console.error(
        'Erro no cadastro:',
        error
      );

      Alert.alert(
        'Erro',
        error?.message ||
          'Não foi possível criar a conta.'
      );
    }
  };

  // =========================================================
  // EMAIL VERIFICATION
  // =========================================================

  const handleVerify = async () => {

    setIsLoading(true);

    if (!isLoaded) {
      return;
    }

    if (!code) {
        setIsLoading(false);
        setIsError("Digite o código recebido por email.");
      Alert.alert(
        'Erro',
        'Digite o código recebido por email.'
      );

      return;
    }

    try {
      const {
        error,
      } = await signUp.verifications.verifyEmailCode({
        code,
      });

      if (error) {
        setIsLoading(false);
        setIsError(error.message +" Código de verificação inválido.");
        Alert.alert(
          'Erro',
          error.message ||
            'Código de verificação inválido.'
        );

        return;
      }

      // =====================================================
      // FINALIZA CADASTRO
      // =====================================================

      const {
        error: finalizeError,
      } = await signUp.finalize();

      if (finalizeError) {
        setIsLoading(false); 
        setIsError(finalizeError.message +" Não foi possível finalizar o cadastro.");
        Alert.alert(
          'Erro',
          finalizeError.message ||
            'Não foi possível finalizar o cadastro.'
        );

        return;
      }
      setIsLoading(false);

      // =====================================================
      // REDIRECIONA PARA HOME
      // =====================================================

      router.replace('/home');

    } catch (error: any) {
      console.error(
        'Erro na verificação:',
        error
      );

      Alert.alert(
        'Erro',
        error?.message ||
          'Não foi possível verificar o código.'
      );
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
    return (
      <View style={styles.container}>
        <Text>
          Você já está autenticado.
        </Text>
      </View>
    );
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

        <Text style={styles.text}>
            {isError}
        </Text>

        <ButtonCustom
          title="Verificar"
          loading={isLoading}
          disabled={code.length === 0}
          onPress={handleVerify}
        />
      </View>
    );
  }

  // =========================================================
  // FORM INVALID
  // =========================================================

  const isFormInvalid =
    name.length === 0 ||
    nameLast.length === 0 ||
    emailAddress.length === 0 ||
    username.length === 0 ||
    password.length === 0 ||
    !!emailError ||
    !!usernameError ||
    !!passwordError;

  // =========================================================
  // SIGN UP SCREEN
  // =========================================================

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

      {/* TITLE */}

      <Text style={styles.title}>
        Criar conta
      </Text>

      <Text style={styles.subtitle}>
        Crie sua conta no DataPulse
      </Text>

      {/* EMAIL */}

      <TextInputCustom
        label="Email"
        error={emailError}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Digite seu email"
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />

      {/* NAME */}

      <TextInputCustom
        label="Primeiro Nome"
        error={nameError}
        autoCapitalize="none"
        value={name}
        placeholder="Digite seu Primeiro Nome"
        onChangeText={handleNameChange}
      />

      {/* NAMELAST */}

      <TextInputCustom
        label="Ultimo Nome"
        error={nameLastError}
        autoCapitalize="none"
        value={nameLast}
        placeholder="Digite seu Ultimo nome"
        onChangeText={handleNameLastChange}
      />

      {/* USERNAME */}

      <TextInputCustom
        label="Username"
        error={usernameError}
        autoCapitalize="none"
        value={username}
        placeholder="Digite seu username"
        onChangeText={handleUsernameChange}
      />

      {/* PASSWORD */}

      <TextInputCustom
        label="Senha"
        error={passwordError}
        value={password}
        placeholder="Digite sua senha"
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
      />

      {/* SIGN UP */}
      <Text style={styles.text}>
        {isError}
      </Text>

      <ButtonCustom
        title="Criar conta"
        loading={isLoading}
        disabled={isFormInvalid}
        onPress={handleSignUp}
      />

      {/* LOGIN */}

      <Text
        style={styles.loginText}
        onPress={() => router.replace('/')}
      >
        Já possui uma conta?{' '}
        <Text style={styles.loginLink}>
          Entrar
        </Text>
      </Text>

      {/* CLERK CAPTCHA - WEB */}

      <View nativeID="clerk-captcha" />


    </View>
  );
}

// =============================================================
// STYLES
// =============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    gap: 12,
    justifyContent: 'center',
  },

  containerLarge: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
  },

  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 10,
  },

  email: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
  },

  loginText: {
    textAlign: 'center',
    marginTop: 10,
  },

  loginLink: {
    fontWeight: '700',
  },

  text: {
    alignSelf: 'center',
    marginTop: 10,
  },
});

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSSO } from '@clerk/expo';

export default function SSOCallback() {
  const router = useRouter();
  const { startSSOFlow } = useSSO();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // O callback é processado pelo fluxo SSO iniciado na tela de login.
        // Se o usuário já estiver autenticado, podemos seguir para Home.
        router.replace('/home');
      } catch (error) {
        console.error('Erro no SSO callback:', error);
        router.replace('/');
      }
    };

    handleCallback();
  }, [router]);

  return null;
}
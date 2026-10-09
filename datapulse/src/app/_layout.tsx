import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  useColorScheme
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Config from '@/app/config';

const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    'Add your Clerk Publishable Key to the .env file'
  );
}


// ============================================================
// ROOT LAYOUT
// ============================================================

export default function RootLayout() {


  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <RootContent />
    </ClerkProvider>
  );
}


// ============================================================
// ROOT CONTENT
// ============================================================

function RootContent() {

  const colorScheme = useColorScheme();

  const styles =
    colorScheme === 'dark'
      ? themeStyles.dark
      : themeStyles.light;

      
  const [configExpanded, setConfigExpanded] =
    useState(false);

  const {
    isLoaded,
    isSignedIn,
  } = useAuth();


  // ==========================================================
  // FECHA CONFIG AO FAZER LOGOUT
  // ==========================================================

  useEffect(() => {
    if (!isSignedIn) {
      setConfigExpanded(false);
    }
  }, [isSignedIn]);


  // ==========================================================
  // AGUARDA O CLERK CARREGAR
  // ==========================================================

  if (!isLoaded) {
    return null;
  }


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <View style={styles.container}>

      {/* ================================================== */}
      {/* CONFIG */}
      {/* ================================================== */}

      {isSignedIn && configExpanded && (
        <View style={styles.configContainer}>
          <Config
            configExpanded={configExpanded}
            setConfigExpanded={setConfigExpanded}
          />
        </View>
      )}


      {/* ================================================== */}
      {/* CONTEÚDO */}
      {/* ================================================== */}

      <View style={styles.content}>
        <Slot />
      </View>


      {/* ================================================== */}
      {/* BOTÃO FLUTUANTE */}
      {/* ================================================== */}

      {isSignedIn && (
        <Pressable
          style={styles.floatingButton}
          onPress={() =>
            setConfigExpanded(prev => !prev)
          }
        >
          <Ionicons
            name={
              configExpanded
                ? 'close'
                : 'settings-outline'
            }
            size={28}
            color="#fff"
          />
        </Pressable>
      )}

    </View>
  );
}


// ============================================================
// STYLES
// ============================================================

const themeStyles = {
  light: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },

    content: {
      flex: 1,
      backgroundColor: '#ffffff',
    },

    floatingButton: {
      position: 'absolute',
      top: 50,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#222222',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 10,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      zIndex: 100,
    },

    configContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#f8fafc',
      zIndex: 50,
      padding: 20,
    },
  }),

  dark: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0f172a',
    },

    content: {
      flex: 1,
      backgroundColor: '#0f172a',
    },

    floatingButton: {
      position: 'absolute',
      top: 50,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#334155',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 10,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      borderWidth: 1,
      borderColor: '#475569',
      zIndex: 100,
    },

    configContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#111827',
      zIndex: 50,
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: '#334155',
    },
  }),
};
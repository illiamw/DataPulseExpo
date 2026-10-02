import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
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

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  floatingButton: {
    position: 'absolute',

    top: 50,
    right: 20,

    width: 56,
    height: 56,

    borderRadius: 28,

    backgroundColor: '#222',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
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

});
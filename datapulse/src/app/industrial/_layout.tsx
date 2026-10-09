import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Slot } from 'expo-router';
import { useState } from 'react';
import NavCustom from '@/app/industrial/navCustom';

export default function Industrial() {
  const colorScheme = useColorScheme();
  
    const styles =
      colorScheme === 'dark'
        ? themeStyles.dark
        : themeStyles.light;
  const [navExpand, setnavExpand] = useState(false);
  return (
    <View style={styles.container}>

        <Pressable
          style={styles.floatingButton}
          onPress={() => setnavExpand(prev => !prev)}
        >
          <Ionicons
            name={navExpand ? 'close' : 'menu'}
            size={28}
            color="#fff"
          />
        </Pressable>

        {navExpand && (
          <View style={styles.configContainer}>
            <NavCustom 
            navExpand={navExpand}
            setNavExpand={setnavExpand}/>
          </View>
        )}

        <View style={styles.content}>
          <Slot />
        </View>

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

    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },

    floatingButton: {
      position: 'absolute',

      top: 50,
      left: 20,

      width: 56,
      height: 56,

      borderRadius: 28,

      backgroundColor: '#222222',

      justifyContent: 'center',
      alignItems: 'center',

      elevation: 10,

      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 5,

      zIndex: 100,
    },

    buttonText: {
      color: '#FFFFFF',
      fontSize: 26,
      fontWeight: 'bold',
    },

    configContainer: {
      position: 'absolute',

      top: 0,
      bottom: 0,
      left: 0,
      right: 0,

      backgroundColor: '#F8FAFC',

      zIndex: 50,

      padding: 20,
    },

    content: {
      flex: 1,
    },

  }),

  // ===========================================================
  // DARK THEME
  // ===========================================================
  dark: StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#111827',
    },

    floatingButton: {
      position: 'absolute',

      top: 50,
      left: 20,

      width: 56,
      height: 56,

      borderRadius: 28,

      backgroundColor: '#374151',

      justifyContent: 'center',
      alignItems: 'center',

      elevation: 10,

      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.4,
      shadowRadius: 5,

      zIndex: 100,
    },

    buttonText: {
      color: '#F9FAFB',
      fontSize: 26,
      fontWeight: 'bold',
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
    },

    content: {
      flex: 1,
    },

  }),
};
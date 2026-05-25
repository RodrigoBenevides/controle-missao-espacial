import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AlertasScreen } from '../screens/AlertasScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { EventosScreen } from '../screens/EventosScreen';
import { SensoresScreen } from '../screens/SensoresScreen';
import type { RootStackParamList } from '../types/mission';

const Stack = createNativeStackNavigator<RootStackParamList>();

const missionTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#08111f',
    border: '#1d3148',
    card: '#101b2d',
    primary: '#67d8ff',
    text: '#f5f8ff',
  },
};

export function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={missionTheme}>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            contentStyle: { backgroundColor: '#08111f' },
            headerStyle: { backgroundColor: '#101b2d' },
            headerTintColor: '#f5f8ff',
            headerTitleStyle: { fontWeight: '700' },
          }}
        >
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: 'Controle de Missao' }}
          />
          <Stack.Screen
            name="Sensores"
            component={SensoresScreen}
            options={{ title: 'Sensores' }}
          />
          <Stack.Screen
            name="Eventos"
            component={EventosScreen}
            options={{ title: 'Eventos Operacionais' }}
          />
          <Stack.Screen
            name="Alertas"
            component={AlertasScreen}
            options={{ title: 'Alertas Criticos' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

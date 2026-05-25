import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Missao Espacial</Text>
      <Text style={styles.subtitle}>App mobile da Global Solution</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#172033',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#526070',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});

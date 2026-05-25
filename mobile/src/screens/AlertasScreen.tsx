import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { AlertaCritico } from '../types/mission';

const alertas: AlertaCritico[] = [
  {
    id: '1',
    origem: 'Modulo Termico',
    mensagem: 'Temperatura acima do limite operacional',
    severidade: 'Alta',
    resolvido: false,
  },
  {
    id: '2',
    origem: 'Modulo de Energia',
    mensagem: 'Nivel de bateria em observacao',
    severidade: 'Media',
    resolvido: true,
  },
];

export function AlertasScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Alertas Criticos</Text>
      <Text style={styles.description}>
        Aqui serao exibidos alertas da missao e sua situacao operacional.
      </Text>

      {alertas.map((alerta) => (
        <View key={alerta.id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.origin}>{alerta.origem}</Text>
            <Text style={alerta.resolvido ? styles.resolved : styles.open}>
              {alerta.resolvido ? 'Resolvido' : 'Aberto'}
            </Text>
          </View>
          <Text style={styles.message}>{alerta.mensagem}</Text>
          <Text style={styles.severity}>Severidade: {alerta.severidade}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#10243a',
    borderColor: '#244b68',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  container: {
    gap: 14,
    padding: 20,
  },
  description: {
    color: '#aebed2',
    fontSize: 15,
    lineHeight: 22,
  },
  message: {
    color: '#f5f8ff',
    fontSize: 16,
    lineHeight: 23,
  },
  open: {
    backgroundColor: '#4a1c23',
    borderRadius: 8,
    color: '#ff8a9b',
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  origin: {
    color: '#f5f8ff',
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
  },
  resolved: {
    backgroundColor: '#113f35',
    borderRadius: 8,
    color: '#71f0bc',
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  severity: {
    color: '#f0c96b',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    color: '#f5f8ff',
    fontSize: 26,
    fontWeight: '800',
  },
});
